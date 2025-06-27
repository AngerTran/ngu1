package com.group1.project.swp_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.group1.project.swp_project.entity.MedicalService;
import com.group1.project.swp_project.repository.MedicalServiceRepository;

@Service
public class MedicalServiceService {
    private final MedicalServiceRepository repository;

    public MedicalServiceService(MedicalServiceRepository repository) {
        this.repository = repository;
    }

    public List<MedicalService> getAllAvailableServices() {
        return repository.findByAvailableTrue();
    }

    public Optional<MedicalService> getServiceById(Long id) {
        return repository.findById(id);
    }

    public MedicalService createService(MedicalService dto) {
        return repository.save(dto);
    }
}
