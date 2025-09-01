# SpendSmart - Expense & Income Tracker

A modern, full-stack application for tracking personal expenses and income with a beautiful, responsive UI.

## Features

- **Expense & Income Tracking**: Add, view, and manage your financial transactions
- **Dashboard Overview**: Get a quick snapshot of your financial health
- **Transaction Categories**: Organize transactions with predefined categories
- **Financial Summary**: Detailed insights into your spending patterns
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: See your financial data update instantly

## Tech Stack

### Backend
- **Spring Boot 3.4.3**: Java-based REST API
- **MongoDB**: NoSQL database for data persistence
- **Spring Security**: Authentication and authorization
- **Maven**: Dependency management and build tool

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **Bootstrap 5**: CSS framework for responsive design
- **Font Awesome**: Icon library
- **React Router**: Client-side routing

## Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- MongoDB (local or cloud instance)
- Maven

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure MongoDB connection in `src/main/resources/application.yml`:
   ```yaml
   spring:
     data:
       mongodb:
         database: spendsmart
         uri: mongodb://localhost:27017/spendsmart
   ```

3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Transactions
- `GET /api/transactions?userId={userId}` - Get all transactions for a user
- `GET /api/transactions/type/{type}?userId={userId}` - Get transactions by type (EXPENSE/INCOME)
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/{id}` - Get a specific transaction
- `PUT /api/transactions/{id}` - Update a transaction
- `DELETE /api/transactions/{id}` - Delete a transaction
- `GET /api/transactions/summary?userId={userId}` - Get financial summary

### Transaction Model
```json
{
  "id": "string",
  "description": "string",
  "amount": "number",
  "type": "EXPENSE|INCOME",
  "category": "string",
  "date": "datetime",
  "userId": "string"
}
```

## Features in Detail

### Dashboard
- Overview of total income, expenses, and current balance
- Quick action buttons for common tasks
- Visual indicators for financial health

### Add Transaction
- Toggle between expense and income
- Predefined categories for easy organization
- Form validation and user-friendly interface

### Transaction List
- View all transactions in a sortable table
- Filter by transaction type (All, Expenses, Income)
- Delete transactions with confirmation
- Category icons for visual identification

### Financial Summary
- Detailed cash flow analysis
- Financial health indicators
- Savings rate and expense ratio calculations
- Personalized financial insights and tips

## Categories

### Expense Categories
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Other

### Income Categories
- Salary
- Freelance
- Investment
- Business
- Gift
- Other

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@spendsmart.com or create an issue in the repository.
