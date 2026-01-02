class DashboardController < ApplicationController
  def index
    @current_month = params[:month] ? Date.parse(params[:month]) : Date.current
    
    # Monthly totals from Income and Expense models
    @income = current_user.incomes.for_month(@current_month).sum(:amount)
    @expenses = current_user.expenses.for_month(@current_month).sum(:amount)
    @net_balance = @income - @expenses

    # Upcoming recurring payments (next 30 days)
    @upcoming_recurring_payments = current_user.recurring_payments.upcoming.limit(10)
    
    # Recent transactions - combine incomes and expenses
    recent_incomes = current_user.incomes.recent.limit(5)
    recent_expenses = current_user.expenses.recent.limit(5)
    
    # Combine and sort by date
    @recent_transactions = (recent_incomes.map { |i| { type: 'income', data: i } } + 
                           recent_expenses.map { |e| { type: 'expense', data: e } })
                          .sort_by { |t| [t[:data].date, t[:data].created_at] }
                          .reverse
                          .first(10)
  end
end

