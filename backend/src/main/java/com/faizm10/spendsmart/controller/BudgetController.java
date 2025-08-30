package com.faizm10.spendsmart.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faizm10.spendsmart.model.Budget;
import com.faizm10.spendsmart.service.BudgetService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {
    
    private final BudgetService budgetService;
    
    @Autowired
    public BudgetController(BudgetService budgetService) {
        this.budgetService = budgetService;
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Budget>> getAllBudgetsByUserId(@PathVariable Long userId) {
        List<Budget> budgets = budgetService.getAllBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<Budget>> getActiveBudgetsByUserId(@PathVariable Long userId) {
        List<Budget> budgets = budgetService.getActiveBudgetsByUserId(userId);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/user/{userId}/active/current")
    public ResponseEntity<List<Budget>> getActiveBudgetsByUserIdAndCurrentDate(@PathVariable Long userId) {
        List<Budget> budgets = budgetService.getActiveBudgetsByUserIdAndCurrentDate(userId);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/user/{userId}/category/{categoryId}")
    public ResponseEntity<List<Budget>> getBudgetsByCategory(@PathVariable Long userId, @PathVariable Long categoryId) {
        List<Budget> budgets = budgetService.getBudgetsByCategory(userId, categoryId);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/user/{userId}/period/{period}")
    public ResponseEntity<List<Budget>> getBudgetsByPeriod(@PathVariable Long userId, @PathVariable Budget.BudgetPeriod period) {
        List<Budget> budgets = budgetService.getBudgetsByPeriod(userId, period);
        return ResponseEntity.ok(budgets);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Budget> getBudgetById(@PathVariable Long id) {
        Optional<Budget> budget = budgetService.getBudgetById(id);
        return budget.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createBudget(@PathVariable Long userId, @Valid @RequestBody Budget budget) {
        try {
            Budget createdBudget = budgetService.createBudget(budget, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBudget);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBudget(@PathVariable Long id, @Valid @RequestBody Budget budgetDetails) {
        try {
            Budget updatedBudget = budgetService.updateBudget(id, budgetDetails);
            return ResponseEntity.ok(updatedBudget);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBudget(@PathVariable Long id) {
        try {
            budgetService.deleteBudget(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateBudget(@PathVariable Long id) {
        try {
            Budget deactivatedBudget = budgetService.deactivateBudget(id);
            return ResponseEntity.ok(deactivatedBudget);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateBudget(@PathVariable Long id) {
        try {
            Budget activatedBudget = budgetService.activateBudget(id);
            return ResponseEntity.ok(activatedBudget);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
