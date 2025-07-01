package com.group1.project.swp_project.controller;

import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.group1.project.swp_project.dto.DashboardSummaryDTO;
import com.group1.project.swp_project.service.DashboardService;

@Tag(name = "Management (Admin)", description = "APIs for Admin to manage user accounts")
@RestController
@RequestMapping("/api/auth/admin")
public class AdminController {

    private final DashboardService dashboardService;

    public AdminController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDTO> getAllDashboard() {
        var c = this.dashboardService.getAllDashboard();
        return ResponseEntity.ok().body(c);
    }
}
