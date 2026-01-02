# Rails Commands Reference

This document lists all the Rails commands you should run to set up the finance tracker.

## Initial Setup

### 1. Install Dependencies

```bash
cd finance_tracker
bundle install
```

### 2. Set Up Devise

```bash
# Generate Devise configuration (already done, but for reference)
bin/rails generate devise:install

# Generate Devise views (optional, for customization)
bin/rails generate devise:views
```

### 3. Run Migrations

```bash
# Create database
bin/rails db:create

# Run all migrations
bin/rails db:migrate

# If you need to rollback and re-run
bin/rails db:rollback
bin/rails db:migrate
```

### 4. Seed Database (Development)

```bash
bin/rails db:seed
```

This creates:
- Demo user: `demo@example.com` / `password123`
- Sample income entries
- Sample expense entries
- Sample recurring payments

## Model Generation Commands

These models have already been created, but here's what was generated:

### Income Model

```bash
bin/rails generate model Income user:references amount:decimal date:date category:string note:text
```

### Expense Model

```bash
bin/rails generate model Expense user:references amount:decimal date:date category:string merchant:string note:text recurring_payment:references
```

### RecurringPayment Model

```bash
bin/rails generate model RecurringPayment user:references name:string amount:decimal category:string start_date:date end_date:date frequency:integer day_of_month:integer day_of_week:integer next_run_on:date active:boolean transaction_type:string
```

### RecurringPaymentRun Model

```bash
bin/rails generate model RecurringPaymentRun recurring_payment:references expense:references run_date:date success:boolean error_message:text
```

## Controller Generation Commands

Controllers have been created, but here's the reference:

### Dashboard Controller

```bash
bin/rails generate controller Dashboard index
```

### Incomes Controller

```bash
bin/rails generate controller Incomes index show new create edit update destroy
```

### Expenses Controller

```bash
bin/rails generate controller Expenses index show new create edit update destroy
```

### Recurring Payments Controller

```bash
bin/rails generate controller RecurringPayments index show new create edit update destroy
```

## Service Object

Service objects are created manually. The structure is:

```
app/services/recurring_payments/run_due.rb
```

## ActiveJob

Job has been created, but reference command:

```bash
bin/rails generate job ProcessRecurringPayments
```

## Rake Tasks

### Process Recurring Payments

```bash
# Process for today
bin/rails recurring_payments:process

# Process for specific date
bin/rails recurring_payments:process[2025-01-15]

# Process for all users
bin/rails recurring_payments:process_all
```

## Database Tasks

### Reset Database (Development Only)

```bash
# Drop, create, migrate, and seed
bin/rails db:reset

# Or step by step
bin/rails db:drop
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

### Check Migration Status

```bash
bin/rails db:migrate:status
```

### Create Migration Manually

```bash
bin/rails generate migration AddFieldToModel field:type
```

## Console Commands

### Rails Console

```bash
bin/rails console
# or
bin/rails c
```

### Test Recurring Payments in Console

```ruby
# In rails console
user = User.first
results = RecurringPayments::RunDue.call(user: user, date: Date.current)
puts results
```

### Test Job in Console

```ruby
# In rails console
ProcessRecurringPaymentsJob.perform_now
```

## Asset Compilation

### Precompile Assets (Production)

```bash
bin/rails assets:precompile
```

### Clear Compiled Assets

```bash
bin/rails assets:clobber
```

## Server

### Start Development Server

```bash
bin/rails server
# or
bin/rails s
```

### Start with Specific Port

```bash
bin/rails server -p 3001
```

## Testing (if using RSpec)

```bash
# Run all tests
bundle exec rspec

# Run specific test
bundle exec rspec spec/models/income_spec.rb
```

## Production Tasks

### Generate Secret Key

```bash
bin/rails secret
```

### Check Routes

```bash
bin/rails routes
```

### Check Environment

```bash
bin/rails runner "puts Rails.env"
```

## Solid Queue (Rails 8 Job Processing)

### Start Queue Worker

```bash
bin/rails solid_queue:start
```

### Check Queue Status

```bash
bin/rails solid_queue:stats
```

## Notes

- All migrations are in `db/migrate/`
- Models are in `app/models/`
- Controllers are in `app/controllers/`
- Service objects are in `app/services/`
- Jobs are in `app/jobs/`
- Rake tasks are in `lib/tasks/`

