package com.group1.project.swp_project.service;

import com.group1.project.swp_project.dto.ConsultantAvailabilityDto;
import com.group1.project.swp_project.dto.ConsultantDTO;
import com.group1.project.swp_project.dto.ConsultantProfileDto;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.repository.FeedbackRepository;
import com.group1.project.swp_project.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConsultantService {

    private final UserRepository userRepository;
    private final FeedbackRepository feedbackRepository;
    private final ConsultantScheduleService scheduleService;

    public ConsultantService(UserRepository userRepository, FeedbackRepository feedbackRepository,
            ConsultantScheduleService scheduleService) {
        this.userRepository = userRepository;
        this.feedbackRepository = feedbackRepository;
        this.scheduleService = scheduleService;
    }

    public List<ConsultantDTO> getAllConsultants(String specialty, String gender) {
        List<Users> consultants = userRepository.findAllByRoleName("Consultant");

        return consultants.stream()
                .filter(u -> u.getProfile() != null)
                .filter(u -> specialty == null || "Tất cả".equalsIgnoreCase(specialty)
                        || specialty.equalsIgnoreCase(u.getProfile().getSpecialty()))
                .filter(u -> {
                    if (gender == null || "Tất cả".equalsIgnoreCase(gender)) {
                        return true;
                    }
                    return gender.equalsIgnoreCase("Nam")
                            ? Boolean.TRUE.equals(u.getProfile().getGender())
                            : Boolean.FALSE.equals(u.getProfile().getGender());
                })
                .map(u -> {
                    Double avgRating = feedbackRepository.getAverageRatingByConsultantId(u.getId());
                    return ConsultantDTO.fromUser(u, avgRating);
                })
                .collect(Collectors.toList());
    }

    public ConsultantProfileDto getConsultantProfileById(int consultantId) {
        Users consultant = userRepository.findById(consultantId)
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        if (!"CONSULTANT".equalsIgnoreCase(consultant.getRole().getRoleName())) {
            throw new RuntimeException("User is not a consultant");
        }

        ConsultantProfileDto dto = new ConsultantProfileDto();
        dto.setId(consultant.getId());
        dto.setEmail(consultant.getEmail());
        dto.setPhone(consultant.getPhone());

        if (consultant.getProfile() != null) {
            dto.setFullName(consultant.getProfile().getFullName());
            dto.setAvatarUrl(consultant.getProfile().getAvatarUrl());
            dto.setSpecialty(consultant.getProfile().getSpecialty());
            dto.setExperienceYears(consultant.getProfile().getExperienceYears());
            dto.setConsultationFee(consultant.getProfile().getConsultationFee());
            dto.setEducation(consultant.getProfile().getEducation());
            dto.setCertifications(consultant.getProfile().getCertifications());
            dto.setGender(consultant.getProfile().getGender());
            dto.setAddress(consultant.getProfile().getAddress());
        }

        // Lấy thông tin lịch trống từ ConsultantScheduleService
        ConsultantAvailabilityDto availability = scheduleService.getConsultantAvailability(consultantId);

        dto.setAvailabilityText(availability.getAvailabilityText());
        dto.setHasAvailability(availability.isHasAvailability());
        dto.setNextAvailableSlot(availability.getNextAvailableSlot());

        return dto;
    }
}
