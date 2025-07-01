package com.group1.project.swp_project.controller;

import com.group1.project.swp_project.dto.*;
import com.group1.project.swp_project.service.ProfileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Profile Management", description = "APIs for managing user profiles")
@RestController
@RequestMapping("/api/auth/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Operation(summary = "Get current user profile", description = "Retrieves the profile information of the currently authenticated user")
    @ApiResponse(responseCode = "200", description = "Profile retrieved successfully")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping
    public ResponseEntity<ProfileResponseDto> getCurrentProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            ProfileResponseDto profile = profileService.getCurrentProfile(email);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Update user profile", description = "Updates the profile information of the currently authenticated user")
    @ApiResponse(responseCode = "200", description = "Profile updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "404", description = "User not found")
    @PutMapping
    public ResponseEntity<?> updateProfile(@Valid @ModelAttribute UpdateProfileRequestDto updateRequest,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            ProfileResponseDto updatedProfile = profileService.updateCurrentProfile(email, updateRequest);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @Operation(summary = "Change user password", description = "Changes the password of the currently authenticated user")
    @ApiResponse(responseCode = "200", description = "Password changed successfully")
    @ApiResponse(responseCode = "400", description = "Invalid password data")
    @ApiResponse(responseCode = "404", description = "User not found")
    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequestDto changePasswordRequest,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            profileService.changePassword(email, changePasswordRequest);
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
