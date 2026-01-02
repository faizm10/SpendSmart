class MakeDayOfMonthNullable < ActiveRecord::Migration[8.0]
  def change
    change_column_null :recurring_payments, :day_of_month, true
  end
end

