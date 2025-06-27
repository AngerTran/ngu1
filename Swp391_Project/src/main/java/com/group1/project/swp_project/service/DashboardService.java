package com.group1.project.swp_project.service;

import org.springframework.stereotype.Service;

import com.group1.project.swp_project.dto.DashboardSummaryDTO;
import com.group1.project.swp_project.repository.UserRepository;

@Service
public class DashboardService {
    private final UserRepository userRepository;

    public DashboardService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public DashboardSummaryDTO getAllDashboard() {
        int totalUsers = userRepository.countAllUsers();
        int totalCustomers = userRepository.countCustomers();
        int totalConsultants = userRepository.countConsultants();

        return new DashboardSummaryDTO(totalUsers, totalCustomers, totalConsultants);
    }

}
