package com.faizm10.spendsmart.controller;

import com.faizm10.spendsmart.model.Category;
import com.faizm10.spendsmart.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    
    private final CategoryService categoryService;
    
    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Category>> getCategoriesByUserId(@PathVariable Long userId) {
        List<Category> categories = categoryService.getAllCategoriesByUserId(userId);
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}/search")
    public ResponseEntity<List<Category>> searchCategories(
            @PathVariable Long userId,
            @RequestParam String name) {
        List<Category> categories = categoryService.searchCategoriesByUserId(userId, name);
        return ResponseEntity.ok(categories);
    }
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createCategory(@PathVariable Long userId, @Valid @RequestBody Category category) {
        try {
            Category createdCategory = categoryService.createCategory(category, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @Valid @RequestBody Category categoryDetails) {
        try {
            Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
            return ResponseEntity.ok(updatedCategory);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}/check-name/{name}")
    public ResponseEntity<Boolean> checkCategoryNameExists(@PathVariable Long userId, @PathVariable String name) {
        boolean exists = categoryService.existsByNameAndUserId(name, userId);
        return ResponseEntity.ok(exists);
    }
}
