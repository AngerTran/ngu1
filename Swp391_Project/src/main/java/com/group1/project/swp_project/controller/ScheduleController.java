package com.group1.project.swp_project.controller;

import com.group1.project.swp_project.dto.*;
import com.group1.project.swp_project.service.ConsultantScheduleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "Schedule Management", description = "APIs for managing consultant schedules and availability")
@RestController
@RequestMapping("/api/schedules")
public class ScheduleController {

    @Autowired
    private ConsultantScheduleService scheduleService;

    @Operation(summary = "Get consultant schedules", description = "Get all schedules for a specific consultant")
    @GetMapping("/consultant/{consultantId}")
    public ResponseEntity<List<ConsultantScheduleDto>> getConsultantSchedules(@PathVariable int consultantId) {
        try {
            List<ConsultantScheduleDto> schedules = scheduleService.getConsultantSchedules(consultantId);
            return ResponseEntity.ok(schedules);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Operation(summary = "Get consultant availability summary", description = "Get availability summary for consultant card display")
    @GetMapping("/consultant/{consultantId}/availability-summary")
    public ResponseEntity<ConsultantAvailabilityDto> getConsultantAvailability(@PathVariable int consultantId) {
        try {
            ConsultantAvailabilityDto availability = scheduleService.getConsultantAvailability(consultantId);
            return ResponseEntity.ok(availability);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Operation(summary = "Create new schedule", description = "Create a new schedule for consultant")
    @PostMapping("/consultant/{consultantId}")
    public ResponseEntity<ConsultantScheduleDto> createSchedule(
            @PathVariable int consultantId,
            @RequestBody ConsultantScheduleDto scheduleDto) {
        try {
            ConsultantScheduleDto createdSchedule = scheduleService.createSchedule(consultantId, scheduleDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Operation(summary = "Update schedule", description = "Update an existing schedule")
    @PutMapping("/{scheduleId}")
    public ResponseEntity<ConsultantScheduleDto> updateSchedule(
            @PathVariable int scheduleId,
            @RequestBody ConsultantScheduleDto scheduleDto) {
        try {
            ConsultantScheduleDto updatedSchedule = scheduleService.updateSchedule(scheduleId, scheduleDto);
            return ResponseEntity.ok(updatedSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Operation(summary = "Delete schedule", description = "Delete a schedule")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<String> deleteSchedule(@PathVariable int scheduleId) {
        try {
            scheduleService.deleteSchedule(scheduleId);
            return ResponseEntity.ok("Schedule deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Get available time slots", description = "Get available time slots for a consultant on a specific date")
    @GetMapping("/consultant/{consultantId}/availability")
    public ResponseEntity<List<AvailableTimeSlot>> getAvailableTimeSlots(
            @PathVariable int consultantId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            List<AvailableTimeSlot> availableSlots = scheduleService.getAvailableTimeSlots(consultantId, date);
            return ResponseEntity.ok(availableSlots);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
