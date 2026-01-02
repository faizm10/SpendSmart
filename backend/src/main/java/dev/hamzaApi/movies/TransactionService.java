package dev.hamzaApi.movies;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    
    private final TransactionRepository transactionRepository;
    
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }
    
    public List<Transaction> getAllTransactions(String userId) {
        return transactionRepository.findByUserIdOrderByDateDesc(userId);
    }
    
    public List<Transaction> getTransactionsByType(String userId, Transaction.TransactionType type) {
        return transactionRepository.findByUserIdAndType(userId, type);
    }
    
    public Transaction createTransaction(Transaction transaction) {
        transaction.setDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }
    
    public Optional<Transaction> getTransactionById(String id) {
        return transactionRepository.findById(id);
    }
    
    public Transaction updateTransaction(String id, Transaction transactionDetails) {
        return transactionRepository.findById(id)
                .map(existingTransaction -> {
                    existingTransaction.setDescription(transactionDetails.getDescription());
                    existingTransaction.setAmount(transactionDetails.getAmount());
                    existingTransaction.setType(transactionDetails.getType());
                    existingTransaction.setCategory(transactionDetails.getCategory());
                    return transactionRepository.save(existingTransaction);
                })
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }
    
    public void deleteTransaction(String id) {
        transactionRepository.deleteById(id);
    }
    
    public BigDecimal getTotalIncome(String userId) {
        return transactionRepository.findByUserIdAndType(userId, Transaction.TransactionType.INCOME)
                .stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    public BigDecimal getTotalExpenses(String userId) {
        return transactionRepository.findByUserIdAndType(userId, Transaction.TransactionType.EXPENSE)
                .stream()
                .map(Transaction::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    public BigDecimal getBalance(String userId) {
        BigDecimal income = getTotalIncome(userId);
        BigDecimal expenses = getTotalExpenses(userId);
        return income.subtract(expenses);
    }
}
