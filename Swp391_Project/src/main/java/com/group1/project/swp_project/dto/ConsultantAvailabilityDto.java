package com.group1.project.swp_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsultantAvailabilityDto {
    private String availabilityText;
    private boolean hasAvailability;
    private String nextAvailableSlot;
}
