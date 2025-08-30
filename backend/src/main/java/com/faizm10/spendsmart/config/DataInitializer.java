package com.faizm10.spendsmart.config;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.faizm10.spendsmart.model.Budget;
import com.faizm10.spendsmart.model.Category;
import com.faizm10.spendsmart.model.Transaction;
import com.faizm10.spendsmart.model.User;
import com.faizm10.spendsmart.repository.BudgetRepository;
import com.faizm10.spendsmart.repository.CategoryRepository;
import com.faizm10.spendsmart.repository.TransactionRepository;
import com.faizm10.spendsmart.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private TransactionRepository transactionRepository;
    
    @Autowired
    private BudgetRepository budgetRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Create sample user
        User user = new User("demo", "demo@spendsmart.com", "password123");
        user.setFirstName("Demo");
        user.setLastName("User");
        user = userRepository.save(user);
        
        // Create sample categories
        Category foodCategory = new Category("Food & Dining", user);
        foodCategory.setColorHex("#FF6B6B");
        foodCategory.setIconName("restaurant");
        foodCategory = categoryRepository.save(foodCategory);
        
        Category transportCategory = new Category("Transportation", user);
        transportCategory.setColorHex("#4ECDC4");
        transportCategory.setIconName("directions_car");
        transportCategory = categoryRepository.save(transportCategory);
        
        Category entertainmentCategory = new Category("Entertainment", user);
        entertainmentCategory.setColorHex("#45B7D1");
        entertainmentCategory.setIconName("movie");
        entertainmentCategory = categoryRepository.save(entertainmentCategory);
        
        Category salaryCategory = new Category("Salary", user);
        salaryCategory.setColorHex("#96CEB4");
        salaryCategory.setIconName("account_balance");
        salaryCategory = categoryRepository.save(salaryCategory);
        
        // Create sample transactions
        Transaction salary = new Transaction("Monthly Salary", new BigDecimal("5000.00"), Transaction.TransactionType.INCOME, user);
        salary.setCategory(salaryCategory);
        salary.setTransactionDate(LocalDateTime.now().minusDays(5));
        transactionRepository.save(salary);
        
        Transaction groceries = new Transaction("Grocery Shopping", new BigDecimal("150.00"), Transaction.TransactionType.EXPENSE, user);
        groceries.setCategory(foodCategory);
        groceries.setTransactionDate(LocalDateTime.now().minusDays(3));
        transactionRepository.save(groceries);
        
        Transaction gas = new Transaction("Gas Station", new BigDecimal("45.00"), Transaction.TransactionType.EXPENSE, user);
        gas.setCategory(transportCategory);
        gas.setTransactionDate(LocalDateTime.now().minusDays(2));
        transactionRepository.save(gas);
        
        Transaction movie = new Transaction("Movie Tickets", new BigDecimal("25.00"), Transaction.TransactionType.EXPENSE, user);
        movie.setCategory(entertainmentCategory);
        movie.setTransactionDate(LocalDateTime.now().minusDays(1));
        transactionRepository.save(movie);
        
        Transaction lunch = new Transaction("Lunch at Restaurant", new BigDecimal("35.00"), Transaction.TransactionType.EXPENSE, user);
        lunch.setCategory(foodCategory);
        lunch.setTransactionDate(LocalDateTime.now());
        transactionRepository.save(lunch);
        
        // Create sample budgets
        Budget foodBudget = new Budget("Monthly Food Budget", new BigDecimal("500.00"), Budget.BudgetPeriod.MONTHLY, user);
        foodBudget.setCategory(foodCategory);
        foodBudget.setStartDate(LocalDateTime.now().withDayOfMonth(1));
        budgetRepository.save(foodBudget);
        
        Budget transportBudget = new Budget("Monthly Transport Budget", new BigDecimal("200.00"), Budget.BudgetPeriod.MONTHLY, user);
        transportBudget.setCategory(transportCategory);
        transportBudget.setStartDate(LocalDateTime.now().withDayOfMonth(1));
        budgetRepository.save(transportBudget);
        
        Budget entertainmentBudget = new Budget("Monthly Entertainment Budget", new BigDecimal("150.00"), Budget.BudgetPeriod.MONTHLY, user);
        entertainmentBudget.setCategory(entertainmentCategory);
        entertainmentBudget.setStartDate(LocalDateTime.now().withDayOfMonth(1));
        budgetRepository.save(entertainmentBudget);
        
        System.out.println("Sample data initialized successfully!");
    }
}
