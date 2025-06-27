package com.group1.project.swp_project.dto;

import com.group1.project.swp_project.entity.Feedback;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedbackDTO {
    private Integer id;
    private String customerName;
    private String avatarUrl;
    private Integer rating;
    private String comment;
    private LocalDateTime createdAt;

    public static FeedbackDTO fromEntity(Feedback f) {
        return FeedbackDTO.builder()
                .id(f.getId())
                .customerName(f.getUser().getProfile().getFullName())
                .avatarUrl(f.getUser().getProfile().getAvatarUrl())
                .rating(f.getRating())
                .comment(f.getComment())
                .createdAt(f.getCreatedAt())
                .build();
    }
}
