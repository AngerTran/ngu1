package com.group1.project.swp_project.service;

import com.group1.project.swp_project.dto.AvailableTimeSlot;
import com.group1.project.swp_project.dto.ConsultantAvailabilityDto;
import com.group1.project.swp_project.dto.ConsultantScheduleDto;
import com.group1.project.swp_project.entity.Appointment;
import com.group1.project.swp_project.entity.ConsultantSchedule;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.repository.AppointmentRepository;
import com.group1.project.swp_project.repository.ConsultantScheduleRepository;
import com.group1.project.swp_project.repository.UserRepository;
import com.group1.project.swp_project.util.DayOfWeek;
import com.group1.project.swp_project.util.ScheduleType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.*;

@Service
public class ConsultantScheduleService {

    @Autowired
    private ConsultantScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    /** Lấy toàn bộ lịch của consultant */
    public List<ConsultantScheduleDto> getConsultantSchedules(int consultantId) {
        Users consultant = userRepository.findById(consultantId).orElse(null);
        if (consultant == null)
            return Collections.emptyList();

        if (!"Consultant".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            return Collections.emptyList();
        }

        List<ConsultantSchedule> schedules = scheduleRepository.findByConsultant(consultant);
        return schedules.stream().map(this::convertToDto).toList();
    }

    /** Lấy availability summary cho card */
    public ConsultantAvailabilityDto getConsultantAvailability(int consultantId) {
        Users consultant = userRepository.findById(consultantId).orElse(null);
        if (consultant == null) {
            return new ConsultantAvailabilityDto("Không tìm thấy consultant", false, null);
        }

        if (!"Consultant".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            return new ConsultantAvailabilityDto("User không phải consultant", false, null);
        }

        List<ConsultantSchedule> schedules = scheduleRepository.findByConsultantAndIsAvailable(consultant, true);
        if (schedules.isEmpty()) {
            return new ConsultantAvailabilityDto("Hiện không có lịch", false, null);
        }

        List<ConsultantSchedule> weeklySchedules = schedules.stream()
                .filter(s -> s.getScheduleType() == ScheduleType.WEEKLY)
                .toList();

        if (!weeklySchedules.isEmpty()) {
            String availabilityText = formatWeeklyAvailability(weeklySchedules);
            String nextSlot = findNextAvailableSlot(consultantId);
            return new ConsultantAvailabilityDto(availabilityText, true, nextSlot);
        }

        List<ConsultantSchedule> specificSchedules = schedules.stream()
                .filter(s -> s.getScheduleType() == ScheduleType.SPECIFIC_DATE
                        && !s.getSpecificDate().isBefore(LocalDate.now()))
                .toList();

        if (!specificSchedules.isEmpty()) {
            String nextSlot = findNextAvailableSlot(consultantId);
            return new ConsultantAvailabilityDto("Có lịch cụ thể", true, nextSlot);
        }

        return new ConsultantAvailabilityDto("Hiện không có lịch", false, null);
    }

    private String formatWeeklyAvailability(List<ConsultantSchedule> weeklySchedules) {
        if (weeklySchedules.isEmpty())
            return "Không có lịch";

        String commonTimeRange = null;
        List<String> days = new ArrayList<>();

        for (ConsultantSchedule schedule : weeklySchedules) {
            String timeRange = schedule.getStartTime() + "-" + schedule.getEndTime();
            if (commonTimeRange == null) {
                commonTimeRange = timeRange;
            }
            days.add(getDayNameInVietnamese(schedule.getDayOfWeek()));
        }

        if (days.size() == 1)
            return days.get(0) + ": " + commonTimeRange;
        if (days.size() <= 3)
            return String.join(", ", days) + ": " + commonTimeRange;
        return "Thứ 2-CN: " + commonTimeRange;
    }

    private String getDayNameInVietnamese(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> "Thứ 2";
            case TUESDAY -> "Thứ 3";
            case WEDNESDAY -> "Thứ 4";
            case THURSDAY -> "Thứ 5";
            case FRIDAY -> "Thứ 6";
            case SATURDAY -> "Thứ 7";
            case SUNDAY -> "CN";
        };
    }

    private String findNextAvailableSlot(int consultantId) {
        for (int i = 0; i < 7; i++) {
            LocalDate checkDate = LocalDate.now().plusDays(i);
            List<AvailableTimeSlot> slots = getAvailableTimeSlots(consultantId, checkDate);
            Optional<AvailableTimeSlot> firstAvailable = slots.stream().filter(AvailableTimeSlot::isAvailable)
                    .findFirst();

            if (firstAvailable.isPresent()) {
                String time = firstAvailable.get().getStartTime().toLocalTime().toString();
                if (i == 0)
                    return "Hôm nay " + time;
                if (i == 1)
                    return "Ngày mai " + time;
                return checkDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.forLanguageTag("vi")) + " "
                        + time;
            }
        }
        return null;
    }

    /** Tạo lịch mới */
    public ConsultantScheduleDto createSchedule(int consultantId, ConsultantScheduleDto dto) {
        Users consultant = userRepository.findById(consultantId).orElse(null);
        if (consultant == null)
            return null;

        if (!"Consultant".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            return null;
        }

        ConsultantSchedule s = new ConsultantSchedule();
        s.setConsultant(consultant);
        s.setScheduleType(ScheduleType.valueOf(dto.getScheduleType()));

        if (ScheduleType.WEEKLY.name().equalsIgnoreCase(dto.getScheduleType())) {
            s.setDayOfWeek(DayOfWeek.valueOf(dto.getDayOfWeek()));
        } else {
            s.setSpecificDate(dto.getSpecificDate());
        }

        s.setStartTime(dto.getStartTime());
        s.setEndTime(dto.getEndTime());
        s.setAvailable(dto.isAvailable());
        s.setNotes(dto.getNotes());
        s.setPricePerSession(dto.getPricePerSession());
        s.setSessionDurationMinutes(dto.getSessionDurationMinutes());

        return convertToDto(scheduleRepository.save(s));
    }

    /** Cập nhật lịch */
    public ConsultantScheduleDto updateSchedule(int scheduleId, ConsultantScheduleDto dto) {
        ConsultantSchedule s = scheduleRepository.findById(scheduleId).orElse(null);
        if (s == null)
            return null;

        s.setScheduleType(ScheduleType.valueOf(dto.getScheduleType()));

        if (ScheduleType.WEEKLY.name().equalsIgnoreCase(dto.getScheduleType())) {
            s.setDayOfWeek(DayOfWeek.valueOf(dto.getDayOfWeek()));
            s.setSpecificDate(null);
        } else {
            s.setSpecificDate(dto.getSpecificDate());
            s.setDayOfWeek(null);
        }

        s.setStartTime(dto.getStartTime());
        s.setEndTime(dto.getEndTime());
        s.setAvailable(dto.isAvailable());
        s.setNotes(dto.getNotes());
        s.setPricePerSession(dto.getPricePerSession());
        s.setSessionDurationMinutes(dto.getSessionDurationMinutes());

        return convertToDto(scheduleRepository.save(s));
    }

    /** Xoá lịch */
    public void deleteSchedule(int scheduleId) {
        if (!scheduleRepository.existsById(scheduleId))
            return;
        scheduleRepository.deleteById(scheduleId);
    }

    /** Lấy slots khả dụng */
    public List<AvailableTimeSlot> getAvailableTimeSlots(int consultantId, LocalDate date) {
        Users consultant = userRepository.findById(consultantId).orElse(null);
        if (consultant == null)
            return Collections.emptyList();
        if (!"Consultant".equalsIgnoreCase(consultant.getRole().getRoleName()))
            return Collections.emptyList();

        java.time.DayOfWeek dayOfWeek = date.getDayOfWeek();
        DayOfWeek scheduleDay;
        try {
            scheduleDay = DayOfWeek.valueOf(dayOfWeek.name());
        } catch (IllegalArgumentException e) {
            return Collections.emptyList();
        }

        List<ConsultantSchedule> schedules = scheduleRepository.findAvailableSchedules(consultantId, scheduleDay, date);
        if (schedules == null || schedules.isEmpty())
            return Collections.emptyList();

        List<AvailableTimeSlot> slots = new ArrayList<>();
        for (ConsultantSchedule s : schedules) {
            slots.addAll(generateDetailedTimeSlots(consultantId, date, s));
        }
        return slots;
    }

    /** Tạo slots chi tiết */
    private List<AvailableTimeSlot> generateDetailedTimeSlots(int consultantId, LocalDate date, ConsultantSchedule s) {
        List<AvailableTimeSlot> slots = new ArrayList<>();
        LocalDateTime start = date.atTime(s.getStartTime());
        LocalDateTime end = date.atTime(s.getEndTime());
        List<Appointment> appointments = appointmentRepository.findAppointmentsByConsultantAndDateRange(consultantId,
                start, end);

        int baseDuration = s.getSessionDurationMinutes() != null ? s.getSessionDurationMinutes() : 60;
        LocalTime currentTime = s.getStartTime();

        while (currentTime.isBefore(s.getEndTime())) {
            LocalDateTime slotStart = date.atTime(currentTime);
            LocalTime next = currentTime.plusMinutes(baseDuration);
            if (next.isAfter(s.getEndTime()))
                next = s.getEndTime();
            LocalDateTime slotEnd = date.atTime(next);

            boolean isAvailable = isSlotAvailable(slotStart, slotEnd, appointments);
            List<Integer> availableDurations = calculateAvailableDurations(slotStart, s.getEndTime(), appointments);

            AvailableTimeSlot slot = new AvailableTimeSlot();
            slot.setStartTime(slotStart);
            slot.setEndTime(slotEnd);
            slot.setAvailable(isAvailable && !availableDurations.isEmpty());
            slot.setPricePerSession(s.getPricePerSession());
            slot.setSessionDurationMinutes(baseDuration);
            slot.setAvailableDurations(availableDurations);

            slots.add(slot);
            currentTime = next;
        }

        return slots;
    }

    private boolean isSlotAvailable(LocalDateTime slotStart, LocalDateTime slotEnd, List<Appointment> appointments) {
        return appointments.stream().noneMatch(a -> a.getAppointmentDate().isBefore(slotEnd) &&
                a.getAppointmentDate().plusMinutes(a.getDurationMinutes()).isAfter(slotStart));
    }

    private List<Integer> calculateAvailableDurations(LocalDateTime slotStart, LocalTime dayEndTime,
            List<Appointment> appointments) {
        List<Integer> durations = new ArrayList<>();
        LocalDateTime dayEnd = slotStart.toLocalDate().atTime(dayEndTime);

        LocalDateTime nextAppointment = appointments.stream()
                .map(Appointment::getAppointmentDate)
                .filter(t -> t.isAfter(slotStart))
                .min(LocalDateTime::compareTo)
                .orElse(dayEnd);

        long maxMinutes = java.time.Duration.between(slotStart, nextAppointment).toMinutes();
        for (int d : List.of(30, 45, 60, 90)) {
            if (d <= maxMinutes)
                durations.add(d);
        }
        return durations;
    }

    private ConsultantScheduleDto convertToDto(ConsultantSchedule s) {
        ConsultantScheduleDto dto = new ConsultantScheduleDto();
        dto.setId(s.getId());
        dto.setScheduleType(s.getScheduleType().name());
        dto.setDayOfWeek(s.getDayOfWeek() != null ? s.getDayOfWeek().name() : null);
        dto.setSpecificDate(s.getSpecificDate());
        dto.setStartTime(s.getStartTime());
        dto.setEndTime(s.getEndTime());
        dto.setAvailable(s.isAvailable());
        dto.setNotes(s.getNotes());
        dto.setPricePerSession(s.getPricePerSession());
        dto.setSessionDurationMinutes(s.getSessionDurationMinutes());
        return dto;
    }
}
