package dev.hamzaApi.movies;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "*")
public class TransactionController {
    
    private final TransactionService transactionService;
    
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }
    
    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(@RequestParam String userId) {
        return ResponseEntity.ok(transactionService.getAllTransactions(userId));
    }
    
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Transaction>> getTransactionsByType(
            @RequestParam String userId, 
            @PathVariable Transaction.TransactionType type) {
        return ResponseEntity.ok(transactionService.getTransactionsByType(userId, type));
    }
    
    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        return ResponseEntity.ok(transactionService.createTransaction(transaction));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable String id) {
        return transactionService.getTransactionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(
            @PathVariable String id, 
            @RequestBody Transaction transactionDetails) {
        try {
            Transaction updatedTransaction = transactionService.updateTransaction(id, transactionDetails);
            return ResponseEntity.ok(updatedTransaction);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable String id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/summary")
    public ResponseEntity<TransactionSummary> getTransactionSummary(@RequestParam String userId) {
        BigDecimal totalIncome = transactionService.getTotalIncome(userId);
        BigDecimal totalExpenses = transactionService.getTotalExpenses(userId);
        BigDecimal balance = transactionService.getBalance(userId);
        
        TransactionSummary summary = new TransactionSummary(totalIncome, totalExpenses, balance);
        return ResponseEntity.ok(summary);
    }
    
    public static class TransactionSummary {
        private BigDecimal totalIncome;
        private BigDecimal totalExpenses;
        private BigDecimal balance;
        
        public TransactionSummary(BigDecimal totalIncome, BigDecimal totalExpenses, BigDecimal balance) {
            this.totalIncome = totalIncome;
            this.totalExpenses = totalExpenses;
            this.balance = balance;
        }
        
        // Getters
        public BigDecimal getTotalIncome() { return totalIncome; }
        public BigDecimal getTotalExpenses() { return totalExpenses; }
        public BigDecimal getBalance() { return balance; }
        
        // Setters
        public void setTotalIncome(BigDecimal totalIncome) { this.totalIncome = totalIncome; }
        public void setTotalExpenses(BigDecimal totalExpenses) { this.totalExpenses = totalExpenses; }
        public void setBalance(BigDecimal balance) { this.balance = balance; }
    }
}
