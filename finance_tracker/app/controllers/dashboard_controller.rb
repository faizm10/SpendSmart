class DashboardController < ApplicationController
  def index
    @current_month = Date.current
    
    # Monthly totals
    @income = current_user.transactions.for_month(@current_month).income.sum(:amount)
    @expenses = current_user.transactions.for_month(@current_month).expense.sum(:amount)
    @net_balance = @income - @expenses

    # Upcoming recurring payments (next 30 days)
    @upcoming_recurring_payments = current_user.recurring_payments.upcoming.limit(10)
    
    # Recent transactions
    @recent_transactions = current_user.transactions.recent.limit(10)
  end
end

