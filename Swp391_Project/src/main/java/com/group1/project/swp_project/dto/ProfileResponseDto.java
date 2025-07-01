package com.group1.project.swp_project.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {

    private int userId;
    private String email;
    private String phone;
    private String roleName;
    private LocalDateTime createdAt;
    private boolean enabled;

    private String fullName;
    private Boolean gender;
    private LocalDate dateOfBirth;
    private String address;
    private String avatarUrl;

    private String specialty;
    private Integer experienceYears;
    private Double consultationFee;
    private String description;
    private String education;
    private String certifications;
}
