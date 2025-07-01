package com.group1.project.swp_project.repository;

import com.group1.project.swp_project.entity.ConsultantSchedule;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.util.DayOfWeek;
import com.group1.project.swp_project.util.ScheduleType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ConsultantScheduleRepository extends JpaRepository<ConsultantSchedule, Integer> {

       List<ConsultantSchedule> findByConsultantAndIsAvailable(Users consultant, boolean isAvailable);

       List<ConsultantSchedule> findByConsultant(Users consultant);

       @Query("""
                         SELECT cs FROM ConsultantSchedule cs
                         WHERE cs.consultant.id = :consultantId
                           AND cs.isAvailable = true
                           AND (
                                 (cs.scheduleType = com.group1.project.swp_project.util.ScheduleType.WEEKLY AND cs.dayOfWeek = :dayOfWeek)
                              OR (cs.scheduleType = com.group1.project.swp_project.util.ScheduleType.SPECIFIC_DATE AND cs.specificDate = :date)
                           )
                     """)
       List<ConsultantSchedule> findAvailableSchedules(
                     @Param("consultantId") int consultantId,
                     @Param("dayOfWeek") DayOfWeek dayOfWeek,
                     @Param("date") LocalDate date);

       @Query("""
                         SELECT cs FROM ConsultantSchedule cs
                         WHERE cs.consultant.role.roleName = 'CONSULTANT'
                           AND cs.isAvailable = true
                     """)
       List<ConsultantSchedule> findAllAvailableSchedules();
}
