package com.faizm10.spendsmart.repository;

import com.faizm10.spendsmart.model.Transaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    Page<Transaction> findByUserId(Long userId, Pageable pageable);
    
    List<Transaction> findByUserIdOrderByTransactionDateDesc(Long userId);
    
    List<Transaction> findByUserIdAndType(Long userId, Transaction.TransactionType type);
    
    List<Transaction> findByUserIdAndCategoryId(Long userId, Long categoryId);
    
    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.transactionDate BETWEEN :startDate AND :endDate ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserIdAndDateRange(@Param("userId") Long userId, 
                                              @Param("startDate") LocalDateTime startDate, 
                                              @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId AND t.type = :type")
    BigDecimal getTotalAmountByUserIdAndType(@Param("userId") Long userId, 
                                            @Param("type") Transaction.TransactionType type);
    
    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id = :userId AND t.type = :type AND t.transactionDate BETWEEN :startDate AND :endDate")
    BigDecimal getTotalAmountByUserIdAndTypeAndDateRange(@Param("userId") Long userId, 
                                                        @Param("type") Transaction.TransactionType type,
                                                        @Param("startDate") LocalDateTime startDate, 
                                                        @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.description LIKE %:keyword% ORDER BY t.transactionDate DESC")
    List<Transaction> findByUserIdAndDescriptionContaining(@Param("userId") Long userId, 
                                                          @Param("keyword") String keyword);
}
