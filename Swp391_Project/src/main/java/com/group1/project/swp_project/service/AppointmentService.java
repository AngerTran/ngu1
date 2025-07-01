package com.group1.project.swp_project.service;

import com.group1.project.swp_project.dto.*;
import com.group1.project.swp_project.entity.*;
import com.group1.project.swp_project.repository.*;
import com.group1.project.swp_project.util.*;
import com.group1.project.swp_project.util.SlotLock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private ConsultantScheduleService scheduleService;

    private final ConcurrentHashMap<String, SlotLock> slotLocks = new ConcurrentHashMap<>();

    @Transactional
    public AppointmentDto bookAppointment(int customerId, BookingRequest request) {
        Users customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Users consultant = userRepository.findById(request.getConsultantId())
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (!"CONSULTANT".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            throw new RuntimeException("User is not a consultant");
        }

        if (!lockTimeSlot(consultant.getId(), request.getAppointmentDate(),
                request.getDurationMinutes(), customerId)) {
            throw new RuntimeException("Time slot is not available or already booked");
        }

        try {
            Double consultationFee = getConsultationFee(consultant, request.getAppointmentDate());

            Appointment appointment = new Appointment();
            appointment.setCustomer(customer);
            appointment.setConsultant(consultant);
            appointment.setAppointmentDate(request.getAppointmentDate());
            appointment.setDurationMinutes(request.getDurationMinutes());
            appointment.setCustomerNotes(request.getCustomerNotes());
            appointment.setConsultationFee(consultationFee);
            appointment.setStatus(AppointmentStatus.PENDING);

            appointment = appointmentRepository.save(appointment);

            Payment payment = new Payment();
            payment.setAppointment(appointment);
            payment.setAmount(consultationFee);
            payment.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()));

            if ("CASH".equalsIgnoreCase(request.getPaymentMethod())) {
                payment.setPaymentStatus(PaymentStatus.PENDING);
                appointment.setStatus(AppointmentStatus.CONFIRMED);
                appointmentRepository.save(appointment);
                releaseSlotLock(consultant.getId(), request.getAppointmentDate(), customerId);
            } else if ("MOMO".equalsIgnoreCase(request.getPaymentMethod())) {
                payment.setPaymentStatus(PaymentStatus.PENDING);
                payment.setTransactionId("MOMO_" + UUID.randomUUID().toString().substring(0, 8));
            }

            paymentRepository.save(payment);

            return convertToAppointmentDto(appointment, payment);

        } catch (Exception e) {
            releaseSlotLock(consultant.getId(), request.getAppointmentDate(), customerId);
            throw e;
        }
    }

    public List<AppointmentDto> getCustomerAppointments(int customerId) {
        Users customer = userRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<Appointment> appointments = appointmentRepository
                .findByCustomerOrderByAppointmentDateDesc(customer);

        return appointments.stream()
                .map(appointment -> convertToAppointmentDto(
                        appointment,
                        paymentRepository.findByAppointment_Id(appointment.getId()).orElse(null)))
                .toList();
    }

    public List<AppointmentDto> getConsultantAppointments(int consultantId) {
        Users consultant = userRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (!"CONSULTANT".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            throw new RuntimeException("User is not a consultant");
        }

        List<Appointment> appointments = appointmentRepository
                .findByConsultantOrderByAppointmentDateDesc(consultant);

        return appointments.stream()
                .map(appointment -> convertToAppointmentDto(
                        appointment,
                        paymentRepository.findByAppointment_Id(appointment.getId()).orElse(null)))
                .toList();
    }

    @Transactional
    public AppointmentDto updateAppointmentStatus(long appointmentId, String status) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus(AppointmentStatus.valueOf(status));
        appointment = appointmentRepository.save(appointment);

        Payment payment = paymentRepository.findByAppointment_Id(appointment.getId()).orElse(null);

        return convertToAppointmentDto(appointment, payment);
    }

    @Transactional
    public PaymentDto updatePaymentStatus(int appointmentId, String paymentStatus) {
        Payment payment = paymentRepository.findByAppointment_Id(appointmentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        payment.setPaymentStatus(PaymentStatus.valueOf(paymentStatus));

        if ("COMPLETED".equalsIgnoreCase(paymentStatus)) {
            payment.setPaymentDate(LocalDateTime.now());

            Appointment appointment = payment.getAppointment();
            appointment.setStatus(AppointmentStatus.CONFIRMED);
            appointmentRepository.save(appointment);

            releaseSlotLock(appointment.getConsultant().getId(),
                    appointment.getAppointmentDate(),
                    appointment.getCustomer().getId());
        } else if ("FAILED".equalsIgnoreCase(paymentStatus)) {
            Appointment appointment = payment.getAppointment();
            appointment.setStatus(AppointmentStatus.CANCELLED);
            appointmentRepository.save(appointment);

            releaseSlotLock(appointment.getConsultant().getId(),
                    appointment.getAppointmentDate(),
                    appointment.getCustomer().getId());
        }

        return convertToPaymentDto(paymentRepository.save(payment));
    }

    @Transactional
    public void handleExpiredMoMoPayments() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);

        List<Payment> expired = paymentRepository.findExpiredMoMoPayments(cutoff);

        for (Payment payment : expired) {
            payment.setPaymentStatus(payment.getPaymentStatus().FAILED);
            payment.setPaymentNotes("Payment expired - 30 min timeout");

            Appointment appointment = payment.getAppointment();
            appointment.setStatus(AppointmentStatus.CANCELLED);

            appointmentRepository.save(appointment);
            paymentRepository.save(payment);

            releaseSlotLock(appointment.getConsultant().getId(),
                    appointment.getAppointmentDate(),
                    appointment.getCustomer().getId());
        }
    }

    private boolean lockTimeSlot(int consultantId, LocalDateTime appointmentDate,
            int durationMinutes, int customerId) {
        cleanupExpiredLocks();
        String key = generateSlotKey(consultantId, appointmentDate, durationMinutes);

        SlotLock existing = slotLocks.get(key);
        if (existing != null) {
            if (existing.isExpired()) {
                slotLocks.remove(key);
            } else if (!existing.isOwnedBy(customerId)) {
                return false;
            }
        }

        if (!isTimeSlotAvailable(consultantId, appointmentDate, durationMinutes)) {
            return false;
        }

        slotLocks.put(key, new SlotLock(customerId, LocalDateTime.now()));
        return true;
    }

    private void releaseSlotLock(int consultantId, LocalDateTime date, int customerId) {
        String key = generateSlotKey(consultantId, date, 60);
        SlotLock lock = slotLocks.get(key);
        if (lock != null && lock.isOwnedBy(customerId)) {
            slotLocks.remove(key);
        }
    }

    private void cleanupExpiredLocks() {
        slotLocks.entrySet().removeIf(e -> e.getValue().isExpired());
    }

    private String generateSlotKey(int consultantId, LocalDateTime date, int duration) {
        return consultantId + "_" + date.toString() + "_" + duration;
    }

    private boolean isTimeSlotAvailable(int consultantId, LocalDateTime date, int duration) {
        LocalDateTime end = date.plusMinutes(duration);
        List<Appointment> conflicts = appointmentRepository.findConflictingAppointments(
                consultantId, date, end);
        return conflicts.isEmpty();
    }

    private Double getConsultationFee(Users consultant, LocalDateTime date) {
        try {
            List<AvailableTimeSlot> slots = scheduleService.getAvailableTimeSlots(
                    consultant.getId(), date.toLocalDate());

            return slots.stream()
                    .filter(slot -> slot.getStartTime().equals(date))
                    .map(AvailableTimeSlot::getPricePerSession)
                    .findFirst()
                    .orElse(consultant.getProfile() != null ? consultant.getProfile().getConsultationFee() : 0.0);
        } catch (Exception e) {
            return consultant.getProfile() != null ? consultant.getProfile().getConsultationFee() : 0.0;
        }
    }

    private AppointmentDto convertToAppointmentDto(Appointment a, Payment p) {
        AppointmentDto dto = new AppointmentDto();
        dto.setId(a.getId());
        dto.setCustomerId(a.getCustomer().getId());
        dto.setCustomerName(a.getCustomer().getProfile() != null ? a.getCustomer().getProfile().getFullName() : "");
        dto.setCustomerPhone(a.getCustomer().getPhone());
        dto.setConsultantId(a.getConsultant().getId());
        dto.setConsultantName(
                a.getConsultant().getProfile() != null ? a.getConsultant().getProfile().getFullName() : "");
        dto.setAppointmentDate(a.getAppointmentDate());
        dto.setDurationMinutes(a.getDurationMinutes());
        dto.setStatus(a.getStatus().name());
        dto.setCustomerNotes(a.getCustomerNotes());
        dto.setConsultantNotes(a.getConsultantNotes());
        dto.setConsultationFee(a.getConsultationFee());
        dto.setCreatedAt(a.getCreatedAt());
        if (p != null) {
            dto.setPayment(convertToPaymentDto(p));
        }
        return dto;
    }

    private PaymentDto convertToPaymentDto(Payment p) {
        PaymentDto dto = new PaymentDto();
        dto.setId(p.getId());
        dto.setAmount(p.getAmount());
        dto.setPaymentMethod(p.getPaymentMethod().name());
        dto.setPaymentStatus(p.getPaymentStatus().name());
        dto.setTransactionId(p.getTransactionId());
        dto.setPaymentDate(p.getPaymentDate());
        dto.setPaymentNotes(p.getPaymentNotes());
        return dto;
    }
}
