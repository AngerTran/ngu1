package com.group1.project.swp_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailableTimeSlot {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isAvailable;
    private Double pricePerSession;
    private Integer sessionDurationMinutes;
    private List<Integer> availableDurations; // Available duration options (30, 45, 60, etc.)
    
    // Constructor for backward compatibility
    public AvailableTimeSlot(LocalDateTime startTime, LocalDateTime endTime, boolean isAvailable) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAvailable = isAvailable;
    }
}
