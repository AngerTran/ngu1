package com.group1.project.swp_project.controller;

import com.group1.project.swp_project.dto.FeedbackDTO;
import com.group1.project.swp_project.dto.req.CreateFeedbackRequest;
import com.group1.project.swp_project.entity.Users;
import com.group1.project.swp_project.service.FeedbackService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public/feedbacks")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping("/consultant/{consultantId}")
    public List<FeedbackDTO> getFeedbacksByConsultant(@PathVariable int consultantId) {
        return feedbackService.getFeedbacksByConsultant(consultantId);
    }

    @PostMapping
    public ResponseEntity<String> createFeedback(
            @AuthenticationPrincipal Users user, // Lấy người dùng đang đăng nhập
            @RequestBody CreateFeedbackRequest request // Nhận JSON từ body
    ) {
        feedbackService.createFeedback(request, user);
        return ResponseEntity.ok("Feedback submitted successfully!");
    }
}
