package dev.hamzaApi.spendsmart;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    
    List<Transaction> findByUserId(String userId);
    List<Transaction> findByUserIdAndType(String userId, Transaction.TransactionType type);
    List<Transaction> findByUserIdOrderByDateDesc(String userId);
}
