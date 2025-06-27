package com.group1.project.swp_project.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.group1.project.swp_project.dto.FeedbackDTO;
import com.group1.project.swp_project.dto.req.CreateFeedbackRequest;
import com.group1.project.swp_project.entity.Feedback;
import com.group1.project.swp_project.entity.MedicalService;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.repository.FeedbackRepository;
import com.group1.project.swp_project.repository.MedicalServiceRepository;
import com.group1.project.swp_project.repository.UserRepository;

@Service
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final UserRepository userRepository;
    private final MedicalServiceRepository serviceRepository;

    public FeedbackService(FeedbackRepository feedbackRepository,
            UserRepository userRepository,
            MedicalServiceRepository serviceRepository) {
        this.feedbackRepository = feedbackRepository;
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    public List<FeedbackDTO> getFeedbacksByConsultant(int consultantId) {
        return feedbackRepository.findByConsultant_Id(consultantId)
                .stream()
                .map(FeedbackDTO::fromEntity)
                .collect(Collectors.toList());
    }

    public void createFeedback(CreateFeedbackRequest request, Users user) {
        Users consultant = userRepository.findById(request.getConsultantId())
                .orElseThrow(() -> new RuntimeException("Consultant not found"));

        Feedback feedback = new Feedback();
        feedback.setUser(user);
        feedback.setConsultant(consultant);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());

        // Optional service
        if (request.getServiceId() != null) {
            MedicalService service = serviceRepository.findById(request.getServiceId())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
            feedback.setService(service);
        }

        feedbackRepository.save(feedback);
    }
}
