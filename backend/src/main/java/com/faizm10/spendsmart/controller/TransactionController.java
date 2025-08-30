package com.faizm10.spendsmart.controller;

import com.faizm10.spendsmart.model.Transaction;
import com.faizm10.spendsmart.service.TransactionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    
    private final TransactionService transactionService;
    
    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsByUserId(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getAllTransactionsByUserId(userId);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/user/{userId}/page")
    public ResponseEntity<Page<Transaction>> getTransactionsByUserIdPaginated(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Transaction> transactions = transactionService.getTransactionsByUserId(userId, pageable);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionService.getTransactionById(id);
        return transaction.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}/type/{type}")
    public ResponseEntity<List<Transaction>> getTransactionsByType(
            @PathVariable Long userId,
            @PathVariable Transaction.TransactionType type) {
        List<Transaction> transactions = transactionService.getTransactionsByType(userId, type);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/user/{userId}/category/{categoryId}")
    public ResponseEntity<List<Transaction>> getTransactionsByCategory(
            @PathVariable Long userId,
            @PathVariable Long categoryId) {
        List<Transaction> transactions = transactionService.getTransactionsByCategory(userId, categoryId);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/user/{userId}/date-range")
    public ResponseEntity<List<Transaction>> getTransactionsByDateRange(
            @PathVariable Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        List<Transaction> transactions = transactionService.getTransactionsByDateRange(userId, start, end);
        return ResponseEntity.ok(transactions);
    }
    
    @GetMapping("/user/{userId}/search")
    public ResponseEntity<List<Transaction>> searchTransactions(
            @PathVariable Long userId,
            @RequestParam String keyword) {
        List<Transaction> transactions = transactionService.searchTransactions(userId, keyword);
        return ResponseEntity.ok(transactions);
    }
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<?> createTransaction(@PathVariable Long userId, @Valid @RequestBody Transaction transaction) {
        try {
            Transaction createdTransaction = transactionService.createTransaction(transaction, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTransaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable Long id, @Valid @RequestBody Transaction transactionDetails) {
        try {
            Transaction updatedTransaction = transactionService.updateTransaction(id, transactionDetails);
            return ResponseEntity.ok(updatedTransaction);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable Long id) {
        try {
            transactionService.deleteTransaction(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}/totals")
    public ResponseEntity<Object> getTransactionTotals(@PathVariable Long userId) {
        BigDecimal totalIncome = transactionService.getTotalIncomeByUserId(userId);
        BigDecimal totalExpenses = transactionService.getTotalExpensesByUserId(userId);
        BigDecimal netBalance = transactionService.getNetBalanceByUserId(userId);
        
        return ResponseEntity.ok(new Object() {
            public final BigDecimal income = totalIncome;
            public final BigDecimal expenses = totalExpenses;
            public final BigDecimal balance = netBalance;
        });
    }
    
    @GetMapping("/user/{userId}/totals/date-range")
    public ResponseEntity<Object> getTransactionTotalsByDateRange(
            @PathVariable Long userId,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME;
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);
        
        BigDecimal totalIncome = transactionService.getTotalIncomeByUserIdAndDateRange(userId, start, end);
        BigDecimal totalExpenses = transactionService.getTotalExpensesByUserIdAndDateRange(userId, start, end);
        BigDecimal netBalance = totalIncome.subtract(totalExpenses);
        
        return ResponseEntity.ok(new Object() {
            public final BigDecimal income = totalIncome;
            public final BigDecimal expenses = totalExpenses;
            public final BigDecimal balance = netBalance;
        });
    }
}
