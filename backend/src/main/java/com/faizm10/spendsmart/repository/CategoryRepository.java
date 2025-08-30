package com.faizm10.spendsmart.repository;

import com.faizm10.spendsmart.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    List<Category> findByUserId(Long userId);
    
    List<Category> findByUserIdAndNameContainingIgnoreCase(Long userId, String name);
    
    @Query("SELECT c FROM Category c WHERE c.user.id = :userId ORDER BY c.name ASC")
    List<Category> findAllByUserIdOrderByName(@Param("userId") Long userId);
    
    boolean existsByNameAndUserId(String name, Long userId);
}
