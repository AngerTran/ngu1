package com.group1.project.swp_project.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.group1.project.swp_project.entity.Appointment;
import com.group1.project.swp_project.entity.Users;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByCustomer(Users customer);

    List<Appointment> findByConsultant(Users consultant);

    List<Appointment> findByCustomerOrderByAppointmentDateDesc(Users customer);

    List<Appointment> findByConsultantOrderByAppointmentDateDesc(Users consultant);

    @Query("SELECT a FROM Appointment a WHERE a.consultant.id = :consultantId " +
            "AND a.appointmentDate BETWEEN :startTime AND :endTime " +
            "AND a.status IN ('PENDING', 'CONFIRMED')")
    List<Appointment> findConflictingAppointments(@Param("consultantId") int consultantId,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate >= :startDate " +
            "AND a.appointmentDate <= :endDate " +
            "AND a.consultant.id = :consultantId")
    List<Appointment> findAppointmentsByConsultantAndDateRange(@Param("consultantId") int consultantId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate);
}
