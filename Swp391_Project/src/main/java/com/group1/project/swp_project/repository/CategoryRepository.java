package com.group1.project.swp_project.repository;

import com.group1.project.swp_project.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    List<Category> findByType(String type);

}
