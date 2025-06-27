package com.group1.project.swp_project.service;

import com.group1.project.swp_project.dto.DashboardSummaryDTO;
import com.group1.project.swp_project.repository.UserRepository;

public class DashboardService {
    private final UserRepository userRepository;

    public DashboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public DashboardSummaryDTO getAllDashboard() {
        long totalUsers = userRepository.countAllUsers();
        long totalCustomers = userRepository.countCustomers();
        long totalConsultants = userRepository.countConsultants();

        return new DashboardSummaryDTO(totalUsers, totalCustomers, totalConsultants);
    }

}
