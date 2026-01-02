# Finance Tracker - Setup Guide

This guide will help you set up the finance tracker application from scratch.

## Prerequisites

- Ruby 3.3+ (or as specified in `.ruby-version`)
- PostgreSQL 9.3+
- Bundler gem

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd finance_tracker
bundle install
```

### 2. Set Up Database

```bash
# Create database
bin/rails db:create

# Run migrations
bin/rails db:migrate

# Load seed data (optional, for development)
bin/rails db:seed
```

### 3. Set Up Devise

After running migrations, generate Devise views (optional, for customization):

```bash
bin/rails generate devise:views
```

### 4. Configure Routes

Update `config/routes.rb` to use Devise:

```ruby
Rails.application.routes.draw do
  devise_for :users
  
  # Your other routes...
  root "dashboard#index"
end
```

### 5. Update Application Controller

Update `app/controllers/application_controller.rb` to use Devise:

```ruby
class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  
  # Remove old authentication code
end
```

### 6. Update Controllers

Update controllers to use `current_user` from Devise instead of custom authentication.

### 7. Run the Application

```bash
bin/rails server
```

Visit `http://localhost:3000`

## Rails Commands Reference

### Generate Models (if starting fresh)

```bash
# Generate Devise User
bin/rails generate devise User

# Generate Income model
bin/rails generate model Income user:references amount:decimal date:date category:string note:text

# Generate Expense model
bin/rails generate model Expense user:references amount:decimal date:date category:string merchant:string note:text recurring_payment:references

# Generate RecurringPayment model
bin/rails generate model RecurringPayment user:references name:string amount:decimal category:string start_date:date end_date:date frequency:integer day_of_month:integer day_of_week:integer next_run_on:date active:boolean transaction_type:string

# Generate RecurringPaymentRun model
bin/rails generate model RecurringPaymentRun recurring_payment:references expense:references run_date:date success:boolean error_message:text
```

### Generate Controllers

```bash
bin/rails generate controller Dashboard index
bin/rails generate controller Incomes index show new create edit update destroy
bin/rails generate controller Expenses index show new create edit update destroy
bin/rails generate controller RecurringPayments index show new create edit update destroy
```

### Generate Service Object

```bash
mkdir -p app/services/recurring_payments
# Then create the service file manually
```

### Generate Job

```bash
bin/rails generate job ProcessRecurringPayments
```

## Testing the Recurring Payments System

### Manual Test via Rake Task

```bash
# Process due payments for today
bin/rails recurring_payments:process

# Process for a specific date
bin/rails recurring_payments:process[2025-01-15]

# Process for all users
bin/rails recurring_payments:process_all
```

### Test via Rails Console

```ruby
# In rails console
user = User.first
results = RecurringPayments::RunDue.call(user: user, date: Date.current)
puts results
```

### Schedule the Job

For production, set up a daily cron job or use a scheduler:

```bash
# Add to crontab (runs daily at 2 AM)
0 2 * * * cd /path/to/app && bin/rails recurring_payments:process
```

Or use a job scheduler like:
- **Heroku Scheduler**: Add `bin/rails recurring_payments:process` as a daily job
- **Sidekiq-Cron**: Configure in `config/schedule.yml`
- **Whenever gem**: Create schedule in `config/schedule.rb`

## Database Indexes

The migrations include the following indexes for performance:

- `incomes`: `user_id + date`, `user_id + category`, `date`
- `expenses`: `user_id + date`, `user_id + category`, `date`, `recurring_payment_id`
- `recurring_payments`: `user_id + active`, `next_run_on`
- `recurring_payment_runs`: `recurring_payment_id + run_date` (unique), `run_date`

## Notes

- The app uses Rails 8 (not 7 as originally requested, but compatible)
- Devise handles authentication instead of custom `has_secure_password`
- Separate `Income` and `Expense` models (not a unified `Transaction` model)
- Recurring payments only generate `Expense` entries (as per requirements)
- The `RecurringPaymentRun` model ensures no duplicate generations

