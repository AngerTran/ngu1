package com.group1.project.swp_project.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private Users user;

    @Column(name = "full_name", length = 100, columnDefinition = "NVARCHAR(100)")
    private String fullName;

    private Double consultationFee;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Lob
    @Column(name = "address", columnDefinition = "NVARCHAR(MAX)")
    private String address;

    @Column(name = "avatar_url", length = 255)
    private String avatarUrl;

    // === Các trường dành riêng cho consultant ===
    @Column(name = "specialty", length = 100)
    private String specialty;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "education", columnDefinition = "NVARCHAR(MAX)")
    private String education;

    @Column(name = "certifications", columnDefinition = "NVARCHAR(MAX)")
    private String certifications;

}
