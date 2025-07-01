package com.group1.project.swp_project.service;

import com.group1.project.swp_project.dto.ChangePasswordRequestDto;
import com.group1.project.swp_project.dto.ConsultantProfileDto;
import com.group1.project.swp_project.dto.ProfileResponseDto;
import com.group1.project.swp_project.dto.UpdateProfileRequestDto;
import com.group1.project.swp_project.dto.req.UpdateProfileDto;
import com.group1.project.swp_project.entity.Profile;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.repository.ProfileRepository;
import com.group1.project.swp_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final ConsultantScheduleService scheduleService;
    private final PasswordEncoder passwordEncoder;

    public ProfileService(ProfileRepository profileRepository,
            UserRepository userRepository,
            ConsultantScheduleService scheduleService,
            PasswordEncoder passwordEncoder) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
        this.scheduleService = scheduleService;
        this.passwordEncoder = passwordEncoder;
    }

    // ==============================
    // Lấy thông tin hồ sơ hiện tại
    // ==============================
    public ProfileResponseDto getCurrentProfile(String email) {
        Users user = getUserByEmail(email);
        Profile profile = getOrCreateProfile(user);

        ProfileResponseDto.ProfileResponseDtoBuilder builder = ProfileResponseDto.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .phone(user.getPhone())
                .roleName(user.getRole().getRoleName())
                .createdAt(user.getCreatedAt())
                .enabled(user.isEnabled())

                .fullName(profile.getFullName())
                .gender(profile.getGender())
                .dateOfBirth(profile.getDateOfBirth())
                .address(profile.getAddress())
                .avatarUrl(profile.getAvatarUrl());

        if ("CONSULTANT".equalsIgnoreCase(user.getRole().getRoleName())) {
            builder.specialty(profile.getSpecialty())
                    .experienceYears(profile.getExperienceYears())
                    .consultationFee(profile.getConsultationFee())
                    .description(profile.getDescription())
                    .education(profile.getEducation())
                    .certifications(profile.getCertifications());
        }

        return builder.build();
    }

    // ==============================
    // Cập nhật thông tin hồ sơ
    // ==============================
    public ProfileResponseDto updateCurrentProfile(String email, UpdateProfileDto dto,
            ConsultantProfileDto consultantDto) {
        Users user = getUserByEmail(email);
        Profile profile = getOrCreateProfile(user);

        // Update basic fields
        profile.setFullName(dto.getFullName());
        profile.setGender(dto.getGender());
        profile.setDateOfBirth(dto.getDateOfBirthday());
        profile.setAddress(dto.getAddress());
        user.setPhone(dto.getPhone());

        // Xử lý avatar
        MultipartFile avatar = dto.getAvatar();
        if (avatar != null && !avatar.isEmpty()) {
            String avatarUrl = saveAvatar(avatar);
            profile.setAvatarUrl(avatarUrl);
        }

        // Nếu là consultant, update thêm fields chuyên ngành
        if ("CONSULTANT".equalsIgnoreCase(user.getRole().getRoleName()) && consultantDto != null) {
            profile.setSpecialty(consultantDto.getSpecialty());
            profile.setExperienceYears(consultantDto.getExperienceYears());
            profile.setConsultationFee(consultantDto.getConsultationFee());
            profile.setDescription(consultantDto.getDescription());
            profile.setEducation(consultantDto.getEducation());
            profile.setCertifications(consultantDto.getCertifications());
        }

        profileRepository.save(profile);
        userRepository.save(user);

        return getCurrentProfile(email);
    }

    // ==============================
    // Đổi mật khẩu
    // ==============================
    @Transactional
    public void changePassword(String email, ChangePasswordRequestDto changePasswordRequest) {
        Users user = getUserByEmail(email);

        if (!passwordEncoder.matches(changePasswordRequest.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Current password is incorrect");
        }

        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            throw new RuntimeException("New password and confirmation do not match");
        }

        user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
        userRepository.save(user);
    }

    // ==============================
    // Lấy profile consultant theo ID
    // ==============================
    public ConsultantProfileDto getConsultantProfileById(int consultantId) {
        Users consultant = userRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (!"CONSULTANT".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            throw new RuntimeException("User is not a consultant");
        }

        Profile profile = consultant.getProfile();
        ConsultantProfileDto dto = new ConsultantProfileDto();
        dto.setId(consultant.getId());
        dto.setEmail(consultant.getEmail());
        dto.setPhone(consultant.getPhone());

        if (profile != null) {
            dto.setFullName(profile.getFullName());
            dto.setAvatarUrl(profile.getAvatarUrl());
            dto.setSpecialty(profile.getSpecialty());
            dto.setExperienceYears(profile.getExperienceYears());
            dto.setDescription(profile.getDescription());
            dto.setConsultationFee(profile.getConsultationFee());
            dto.setEducation(profile.getEducation());
            dto.setCertifications(profile.getCertifications());
            dto.setGender(profile.getGender());
            dto.setAddress(profile.getAddress());
        }

        var availability = scheduleService.getConsultantAvailability(consultantId);
        dto.setAvailabilityText(availability.getAvailabilityText());
        dto.setHasAvailability(availability.isHasAvailability());
        dto.setNextAvailableSlot(availability.getNextAvailableSlot());

        return dto;
    }

    // ==============================
    // Utils
    // ==============================
    public Users getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found: " + email));
    }

    private Profile getOrCreateProfile(Users user) {
        return Optional.ofNullable(user.getProfile()).orElseGet(() -> {
            Profile newProfile = new Profile();
            newProfile.setUser(user);
            user.setProfile(newProfile);
            return newProfile;
        });
    }

    private String saveAvatar(MultipartFile avatar) {
        try {
            String fileName = UUID.randomUUID() + "_" + avatar.getOriginalFilename();
            String uploadDir = System.getProperty("user.dir") + "/uploads/avatar";
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            avatar.transferTo(filePath.toFile());

            return "/avatars/" + fileName;

        } catch (Exception e) {
            throw new RuntimeException("Failed to save avatar", e);
        }
    }

    public ProfileResponseDto updateCurrentProfile(String email, UpdateProfileRequestDto updateRequest) {
        Users user = getUserByEmail(email);
        Profile profile = getOrCreateProfile(user);

        // Basic fields
        if (updateRequest.getFullName() != null) {
            profile.setFullName(updateRequest.getFullName());
        }
        if (updateRequest.getGender() != null) {
            profile.setGender(updateRequest.getGender());
        }
        if (updateRequest.getDateOfBirth() != null) {
            profile.setDateOfBirth(updateRequest.getDateOfBirth());
        }
        if (updateRequest.getAddress() != null) {
            profile.setAddress(updateRequest.getAddress());
        }
        if (updateRequest.getPhone() != null) {
            user.setPhone(updateRequest.getPhone());
        }

        // Nếu user là tư vấn viên, xử lý phần chuyên ngành
        if ("CONSULTANT".equalsIgnoreCase(user.getRole().getRoleName())) {
            if (updateRequest.getSpecialization() != null) {
                profile.setSpecialty(updateRequest.getSpecialization());
            }
            if (updateRequest.getYearsOfExperience() != null) {
                profile.setExperienceYears(updateRequest.getYearsOfExperience());
            }
            if (updateRequest.getConsultationFee() != null) {
                profile.setConsultationFee(updateRequest.getConsultationFee());
            }
            if (updateRequest.getEducation() != null) {
                profile.setEducation(updateRequest.getEducation());
            }
            if (updateRequest.getCertifications() != null) {
                profile.setCertifications(updateRequest.getCertifications());
            }
        }

        // Lưu lại
        profileRepository.save(profile);
        userRepository.save(user);

        // Trả lại hồ sơ mới
        return getCurrentProfile(email);
    }
}
