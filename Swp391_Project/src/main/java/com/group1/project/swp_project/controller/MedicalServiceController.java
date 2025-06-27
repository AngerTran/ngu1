package com.group1.project.swp_project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group1.project.swp_project.entity.MedicalService;
import com.group1.project.swp_project.service.MedicalServiceService;

@RestController
@RequestMapping("/api/public")

public class MedicalServiceController {

    private final MedicalServiceService service;

    public MedicalServiceController(MedicalServiceService service) {
        this.service = service;
    }

    // Lấy tất cả dịch vụ còn hoạt động
    @GetMapping("/services")
    public ResponseEntity<List<MedicalService>> getAllServices() {
        List<MedicalService> services = service.getAllAvailableServices();
        return services.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(services);
    }

    // Lấy dịch vụ theo ID
    @GetMapping("/services/{id}")
    public ResponseEntity<MedicalService> getServiceById(@PathVariable Long id) {
        Optional<MedicalService> result = service.getServiceById(id);
        return result.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // (Optional) Tạo dịch vụ mới
    @PostMapping("/services")
    public ResponseEntity<MedicalService> createService(@RequestBody MedicalService dto) {
        MedicalService created = service.createService(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
