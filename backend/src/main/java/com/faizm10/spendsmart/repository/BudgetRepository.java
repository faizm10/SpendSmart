package com.faizm10.spendsmart.repository;

import com.faizm10.spendsmart.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BudgetRepository extends JpaRepository<Budget, Long> {
    
    List<Budget> findByUserId(Long userId);
    
    List<Budget> findByUserIdAndIsActiveTrue(Long userId);
    
    List<Budget> findByUserIdAndCategoryId(Long userId, Long categoryId);
    
    @Query("SELECT b FROM Budget b WHERE b.user.id = :userId AND b.isActive = true AND b.startDate <= :currentDate AND (b.endDate IS NULL OR b.endDate >= :currentDate)")
    List<Budget> findActiveBudgetsByUserId(@Param("userId") Long userId, @Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT b FROM Budget b WHERE b.user.id = :userId AND b.period = :period AND b.isActive = true")
    List<Budget> findByUserIdAndPeriodAndActive(@Param("userId") Long userId, @Param("period") Budget.BudgetPeriod period);
}
