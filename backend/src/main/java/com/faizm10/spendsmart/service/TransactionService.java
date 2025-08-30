package com.faizm10.spendsmart.service;

import com.faizm10.spendsmart.model.Transaction;
import com.faizm10.spendsmart.model.User;
import com.faizm10.spendsmart.repository.TransactionRepository;
import com.faizm10.spendsmart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TransactionService {
    
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;
    
    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }
    
    public List<Transaction> getAllTransactionsByUserId(Long userId) {
        return transactionRepository.findByUserIdOrderByTransactionDateDesc(userId);
    }
    
    public Page<Transaction> getTransactionsByUserId(Long userId, Pageable pageable) {
        return transactionRepository.findByUserId(userId, pageable);
    }
    
    public Optional<Transaction> getTransactionById(Long id) {
        return transactionRepository.findById(id);
    }
    
    public List<Transaction> getTransactionsByType(Long userId, Transaction.TransactionType type) {
        return transactionRepository.findByUserIdAndType(userId, type);
    }
    
    public List<Transaction> getTransactionsByCategory(Long userId, Long categoryId) {
        return transactionRepository.findByUserIdAndCategoryId(userId, categoryId);
    }
    
    public List<Transaction> getTransactionsByDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        return transactionRepository.findByUserIdAndDateRange(userId, startDate, endDate);
    }
    
    public List<Transaction> searchTransactions(Long userId, String keyword) {
        return transactionRepository.findByUserIdAndDescriptionContaining(userId, keyword);
    }
    
    public Transaction createTransaction(Transaction transaction, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        transaction.setUser(user);
        return transactionRepository.save(transaction);
    }
    
    public Transaction updateTransaction(Long id, Transaction transactionDetails) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        transaction.setDescription(transactionDetails.getDescription());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setType(transactionDetails.getType());
        transaction.setCategory(transactionDetails.getCategory());
        transaction.setTransactionDate(transactionDetails.getTransactionDate());
        transaction.setNotes(transactionDetails.getNotes());
        
        return transactionRepository.save(transaction);
    }
    
    public void deleteTransaction(Long id) {
        if (!transactionRepository.existsById(id)) {
            throw new RuntimeException("Transaction not found");
        }
        transactionRepository.deleteById(id);
    }
    
    public BigDecimal getTotalIncomeByUserId(Long userId) {
        BigDecimal total = transactionRepository.getTotalAmountByUserIdAndType(userId, Transaction.TransactionType.INCOME);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalExpensesByUserId(Long userId) {
        BigDecimal total = transactionRepository.getTotalAmountByUserIdAndType(userId, Transaction.TransactionType.EXPENSE);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalIncomeByUserIdAndDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        BigDecimal total = transactionRepository.getTotalAmountByUserIdAndTypeAndDateRange(
            userId, Transaction.TransactionType.INCOME, startDate, endDate);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public BigDecimal getTotalExpensesByUserIdAndDateRange(Long userId, LocalDateTime startDate, LocalDateTime endDate) {
        BigDecimal total = transactionRepository.getTotalAmountByUserIdAndTypeAndDateRange(
            userId, Transaction.TransactionType.EXPENSE, startDate, endDate);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    public BigDecimal getNetBalanceByUserId(Long userId) {
        BigDecimal income = getTotalIncomeByUserId(userId);
        BigDecimal expenses = getTotalExpensesByUserId(userId);
        return income.subtract(expenses);
    }
}
