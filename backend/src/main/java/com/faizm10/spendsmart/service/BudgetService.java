package com.faizm10.spendsmart.service;

import com.faizm10.spendsmart.model.Budget;
import com.faizm10.spendsmart.model.User;
import com.faizm10.spendsmart.repository.BudgetRepository;
import com.faizm10.spendsmart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class BudgetService {
    
    private final BudgetRepository budgetRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public BudgetService(BudgetRepository budgetRepository, UserRepository userRepository) {
        this.budgetRepository = budgetRepository;
        this.userRepository = userRepository;
    }
    
    public List<Budget> getAllBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserId(userId);
    }
    
    public List<Budget> getActiveBudgetsByUserId(Long userId) {
        return budgetRepository.findByUserIdAndIsActiveTrue(userId);
    }
    
    public List<Budget> getActiveBudgetsByUserIdAndCurrentDate(Long userId) {
        return budgetRepository.findActiveBudgetsByUserId(userId, LocalDateTime.now());
    }
    
    public List<Budget> getBudgetsByCategory(Long userId, Long categoryId) {
        return budgetRepository.findByUserIdAndCategoryId(userId, categoryId);
    }
    
    public List<Budget> getBudgetsByPeriod(Long userId, Budget.BudgetPeriod period) {
        return budgetRepository.findByUserIdAndPeriodAndActive(userId, period);
    }
    
    public Optional<Budget> getBudgetById(Long id) {
        return budgetRepository.findById(id);
    }
    
    public Budget createBudget(Budget budget, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        budget.setUser(user);
        return budgetRepository.save(budget);
    }
    
    public Budget updateBudget(Long id, Budget budgetDetails) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        
        budget.setName(budgetDetails.getName());
        budget.setAmount(budgetDetails.getAmount());
        budget.setPeriod(budgetDetails.getPeriod());
        budget.setCategory(budgetDetails.getCategory());
        budget.setStartDate(budgetDetails.getStartDate());
        budget.setEndDate(budgetDetails.getEndDate());
        budget.setNotes(budgetDetails.getNotes());
        budget.setActive(budgetDetails.isActive());
        
        return budgetRepository.save(budget);
    }
    
    public void deleteBudget(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new RuntimeException("Budget not found");
        }
        budgetRepository.deleteById(id);
    }
    
    public Budget deactivateBudget(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        
        budget.setActive(false);
        return budgetRepository.save(budget);
    }
    
    public Budget activateBudget(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Budget not found"));
        
        budget.setActive(true);
        return budgetRepository.save(budget);
    }
}
