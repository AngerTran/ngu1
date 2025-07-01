package com.group1.project.swp_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultantScheduleDto {
    private int id;
    private String scheduleType;
    private String dayOfWeek;
    private LocalDate specificDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean available;
    private String notes;
    private Double pricePerSession;
    private Integer sessionDurationMinutes;

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    // Additional method for compatibility
    public void setIsAvailable(boolean available) {
        this.available = available;
    }
}
