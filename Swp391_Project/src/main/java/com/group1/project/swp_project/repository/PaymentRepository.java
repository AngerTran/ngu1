package com.group1.project.swp_project.repository;

import com.group1.project.swp_project.entity.Payment;
import com.group1.project.swp_project.util.PaymentStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByAppointment_Id(long appointmentId);

    List<Payment> findByPaymentStatus(PaymentStatus paymentStatus);

    @Query("SELECT p FROM Payment p WHERE p.paymentMethod = 'MOMO' " +
            "AND p.paymentStatus = 'PENDING' " +
            "AND p.createdAt < :cutoffTime")
    List<Payment> findExpiredMoMoPayments(@Param("cutoffTime") LocalDateTime cutoffTime);
}
