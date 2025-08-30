# SpendSmart - Financial Management Application

A comprehensive financial management application built with Spring Boot backend and Next.js frontend.

## Features

- **User Management**: Create and manage user accounts
- **Transaction Tracking**: Record income, expenses, and transfers
- **Category Management**: Organize transactions with custom categories
- **Budget Planning**: Set and track budgets by category and period
- **Financial Analytics**: View income, expenses, and net balance
- **Real-time Dashboard**: Beautiful, responsive UI with live data

## Tech Stack

### Backend
- **Spring Boot 3.4.8** - Java framework
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database for development
- **Spring Validation** - Input validation
- **Spring Actuator** - Application monitoring

### Frontend
- **Next.js 15.4.6** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management

## Project Structure

```
SpendSmart/
├── backend/                 # Spring Boot application
│   ├── src/main/java/
│   │   └── com/faizm10/spendsmart/
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity models
│   │       ├── repository/  # Data access layer
│   │       ├── service/     # Business logic
│   │       └── SpendsmartApplication.java
│   └── pom.xml
├── frontend/                # Next.js application
│   ├── src/app/
│   │   ├── page.tsx         # Main dashboard
│   │   ├── layout.tsx       # App layout
│   │   └── globals.css      # Global styles
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- **Java 21** or higher
- **Node.js 18** or higher
- **Maven** (for backend)
- **npm** or **yarn** (for frontend)

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Build the application:**
   ```bash
   mvn clean install
   ```

3. **Run the Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

4. **Access H2 Database Console:**
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:spendsmartdb`
   - Username: `sa`
   - Password: `password`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Transactions
- `GET /api/transactions/user/{userId}` - Get user transactions
- `GET /api/transactions/{id}` - Get transaction by ID
- `POST /api/transactions/user/{userId}` - Create transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction
- `GET /api/transactions/user/{userId}/totals` - Get transaction totals

### Categories
- `GET /api/categories/user/{userId}` - Get user categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories/user/{userId}` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Budgets
- `GET /api/budgets/user/{userId}` - Get user budgets
- `GET /api/budgets/user/{userId}/active` - Get active budgets
- `GET /api/budgets/{id}` - Get budget by ID
- `POST /api/budgets/user/{userId}` - Create budget
- `PUT /api/budgets/{id}` - Update budget
- `DELETE /api/budgets/{id}` - Delete budget

### Health Check
- `GET /api/health` - Application health status

## Sample Data

The application comes with pre-loaded sample data including:
- Demo user (ID: 1)
- Sample categories (Food & Dining, Transportation, Entertainment, Salary)
- Sample transactions (income and expenses)
- Sample budgets for different categories

## Features in Detail

### Dashboard
- **Financial Summary**: Total income, expenses, and net balance
- **Recent Transactions**: Latest 5 transactions with category colors
- **Active Budgets**: Current budgets with progress indicators
- **Categories**: All user categories with color coding

### Transaction Management
- Support for INCOME, EXPENSE, and TRANSFER types
- Category assignment with color coding
- Date tracking and notes
- Search and filtering capabilities

### Budget Tracking
- Multiple budget periods (Daily, Weekly, Monthly, Yearly)
- Category-specific budgets
- Active/inactive status management
- Progress tracking

### Category System
- Custom category creation
- Color and icon assignment
- User-specific categories
- Transaction organization

## Development

### Backend Development
- The backend uses H2 in-memory database for development
- JPA entities with proper relationships
- Service layer for business logic
- RESTful API design
- CORS configured for frontend integration

### Frontend Development
- TypeScript for type safety
- Responsive design with Tailwind CSS
- Real-time data fetching from backend
- Error handling and loading states
- Modern React patterns with hooks

## Configuration

### Backend Configuration (`application.properties`)
- Server port: 8080
- H2 database configuration
- JPA settings
- Logging configuration
- Actuator endpoints

### Frontend Configuration
- API base URL: `http://localhost:8080/api`
- CORS enabled for backend communication
- TypeScript strict mode enabled

## Running in Production

### Backend Production
1. Change database configuration to use PostgreSQL or MySQL
2. Configure proper security settings
3. Set up environment variables
4. Build JAR file: `mvn clean package`
5. Run: `java -jar target/spendsmart-0.0.1-SNAPSHOT.jar`

### Frontend Production
1. Build the application: `npm run build`
2. Start production server: `npm start`
3. Configure environment variables for API endpoints

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.