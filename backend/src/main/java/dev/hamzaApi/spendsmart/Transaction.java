package dev.hamzaApi.spendsmart;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Document(collection = "transactions")
public class Transaction {
    
    @Id
    private String id;
    
    private String description;
    private BigDecimal amount;
    private TransactionType type; // EXPENSE or INCOME
    private String category;
    private LocalDateTime date;
    private String userId;
    
    public Transaction() {}
    
    public Transaction(String id, String description, BigDecimal amount, TransactionType type, String category, LocalDateTime date, String userId) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.type = type;
        this.category = category;
        this.date = date;
        this.userId = userId;
    }
    
    // Getters
    public String getId() { return id; }
    public String getDescription() { return description; }
    public BigDecimal getAmount() { return amount; }
    public TransactionType getType() { return type; }
    public String getCategory() { return category; }
    public LocalDateTime getDate() { return date; }
    public String getUserId() { return userId; }
    
    // Setters
    public void setId(String id) { this.id = id; }
    public void setDescription(String description) { this.description = description; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public void setType(TransactionType type) { this.type = type; }
    public void setCategory(String category) { this.category = category; }
    public void setDate(LocalDateTime date) { this.date = date; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public enum TransactionType {
        EXPENSE,
        INCOME
    }
}
