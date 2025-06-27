package com.group1.project.swp_project.dto.req;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateFeedbackRequest {
    private Integer consultantId;
    private Long serviceId; // Optional
    private Integer rating;
    private String comment;
}
