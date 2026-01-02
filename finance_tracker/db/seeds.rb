# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

puts "Creating seed data..."

# Create a test user
user = User.find_or_create_by!(email: "demo@example.com") do |u|
  u.password = "password123"
  u.password_confirmation = "password123"
end

puts "Created user: #{user.email}"

# Create sample incomes for current month
current_month = Date.current.beginning_of_month
incomes_data = [
  { amount: 5000.00, date: current_month + 1.day, category: "Salary", note: "Monthly salary" },
  { amount: 500.00, date: current_month + 5.days, category: "Freelance", note: "Side project payment" },
  { amount: 200.00, date: current_month + 10.days, category: "Investment", note: "Dividend payment" }
]

incomes_data.each do |income_data|
  user.incomes.find_or_create_by!(
    date: income_data[:date],
    category: income_data[:category],
    amount: income_data[:amount]
  ) do |income|
    income.note = income_data[:note]
  end
end

puts "Created #{incomes_data.count} income entries"

# Create sample expenses for current month
expenses_data = [
  { amount: 1200.00, date: current_month + 1.day, category: "Rent", merchant: "Landlord", note: "Monthly rent payment" },
  { amount: 150.00, date: current_month + 3.days, category: "Groceries", merchant: "Whole Foods", note: "Weekly groceries" },
  { amount: 80.00, date: current_month + 5.days, category: "Utilities", merchant: "Electric Company", note: "Electric bill" },
  { amount: 45.00, date: current_month + 7.days, category: "Transportation", merchant: "Gas Station", note: "Gas fill-up" },
  { amount: 200.00, date: current_month + 10.days, category: "Dining", merchant: "Restaurant", note: "Dinner with friends" },
  { amount: 100.00, date: current_month + 15.days, category: "Entertainment", merchant: "Netflix", note: "Monthly subscription" },
  { amount: 60.00, date: current_month + 20.days, category: "Groceries", merchant: "Trader Joe's", note: "Weekly groceries" }
]

expenses_data.each do |expense_data|
  user.expenses.find_or_create_by!(
    date: expense_data[:date],
    category: expense_data[:category],
    amount: expense_data[:amount]
  ) do |expense|
    expense.merchant = expense_data[:merchant]
    expense.note = expense_data[:note]
  end
end

puts "Created #{expenses_data.count} expense entries"

# Create sample recurring payments
recurring_payments_data = [
  {
    name: "Monthly Rent",
    amount: 1200.00,
    category: "Rent",
    transaction_type: "expense",
    frequency: "monthly",
    day_of_month: 1,
    start_date: current_month,
    next_run_on: (current_month + 1.month).beginning_of_month + 0.days,
    active: true
  },
  {
    name: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    transaction_type: "expense",
    frequency: "monthly",
    day_of_month: 10,
    start_date: current_month,
    next_run_on: current_month + 9.days,
    active: true
  },
  {
    name: "Weekly Groceries",
    amount: 150.00,
    category: "Groceries",
    transaction_type: "expense",
    frequency: "weekly",
    day_of_week: 0, # Sunday
    start_date: current_month,
    next_run_on: current_month.beginning_of_week(:sunday),
    active: true
  },
  {
    name: "Salary",
    amount: 5000.00,
    category: "Salary",
    transaction_type: "income",
    frequency: "monthly",
    day_of_month: 1,
    start_date: current_month,
    next_run_on: (current_month + 1.month).beginning_of_month + 0.days,
    active: true
  }
]

recurring_payments_data.each do |rp_data|
  user.recurring_payments.find_or_create_by!(
    name: rp_data[:name]
  ) do |rp|
    rp.amount = rp_data[:amount]
    rp.category = rp_data[:category]
    rp.transaction_type = rp_data[:transaction_type]
    rp.frequency = rp_data[:frequency]
    rp.day_of_month = rp_data[:day_of_month]
    rp.day_of_week = rp_data[:day_of_week]
    rp.start_date = rp_data[:start_date]
    rp.next_run_on = rp_data[:next_run_on]
    rp.active = rp_data[:active]
  end
end

puts "Created #{recurring_payments_data.count} recurring payments"

puts "\n✓ Seed data created successfully!"
puts "You can log in with:"
puts "  Email: demo@example.com"
puts "  Password: password123"

