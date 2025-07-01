package com.group1.project.swp_project.dto;

import lombok.*;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequestDto {
    // Profile info
    private String fullName;
    private Boolean gender;
    private LocalDate dateOfBirth;
    private String address;
    private String phone;

    // Consultant specific fields (optional)
    private String specialization;
    private Integer yearsOfExperience;
    private Double consultationFee;
    private String education;
    private String certifications;
}
