package com.group1.project.swp_project.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.group1.project.swp_project.entity.Feedback;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.consultant.id = :id")
    Double getAverageRatingByConsultantId(@Param("id") int consultantId);

    List<Feedback> findByConsultant_Id(int consultantId);
}