package com.faizm10.spendsmart.service;

import com.faizm10.spendsmart.model.Category;
import com.faizm10.spendsmart.model.User;
import com.faizm10.spendsmart.repository.CategoryRepository;
import com.faizm10.spendsmart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public CategoryService(CategoryRepository categoryRepository, UserRepository userRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }
    
    public List<Category> getAllCategoriesByUserId(Long userId) {
        return categoryRepository.findAllByUserIdOrderByName(userId);
    }
    
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    public List<Category> searchCategoriesByUserId(Long userId, String name) {
        return categoryRepository.findByUserIdAndNameContainingIgnoreCase(userId, name);
    }
    
    public Category createCategory(Category category, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Check if category name already exists for this user
        if (categoryRepository.existsByNameAndUserId(category.getName(), userId)) {
            throw new RuntimeException("Category name already exists for this user");
        }
        
        category.setUser(user);
        return categoryRepository.save(category);
    }
    
    public Category updateCategory(Long id, Category categoryDetails) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        // Check if new name conflicts with existing categories for the same user
        if (!category.getName().equals(categoryDetails.getName()) && 
            categoryRepository.existsByNameAndUserId(categoryDetails.getName(), category.getUser().getId())) {
            throw new RuntimeException("Category name already exists for this user");
        }
        
        category.setName(categoryDetails.getName());
        category.setDescription(categoryDetails.getDescription());
        category.setColorHex(categoryDetails.getColorHex());
        category.setIconName(categoryDetails.getIconName());
        
        return categoryRepository.save(category);
    }
    
    public void deleteCategory(Long id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        
        // Check if category has associated transactions
        if (!category.getTransactions().isEmpty()) {
            throw new RuntimeException("Cannot delete category with associated transactions");
        }
        
        categoryRepository.deleteById(id);
    }
    
    public boolean existsByNameAndUserId(String name, Long userId) {
        return categoryRepository.existsByNameAndUserId(name, userId);
    }
}
