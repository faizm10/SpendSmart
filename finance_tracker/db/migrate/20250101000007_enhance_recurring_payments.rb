class EnhanceRecurringPayments < ActiveRecord::Migration[8.0]
  def change
    change_table :recurring_payments do |t|
      t.string :category
      t.date :start_date
      t.date :end_date
      t.integer :frequency, default: 2 # 0=weekly, 1=biweekly, 2=monthly, 3=yearly
      t.integer :day_of_week # 0=Sunday, 1=Monday, etc.
      # day_of_month already exists, keep it
      # next_run_on already exists, keep it
      # active already exists, keep it
    end

    # Update existing records to have required fields
    reversible do |dir|
      dir.up do
        # Set defaults for existing records
        execute <<-SQL
          UPDATE recurring_payments 
          SET category = COALESCE(category, 'Uncategorized'),
              start_date = COALESCE(start_date, next_run_on),
              frequency = COALESCE(frequency, 2)
          WHERE category IS NULL OR start_date IS NULL OR frequency IS NULL;
        SQL
      end
    end

    # Make fields required after setting defaults
    change_column_null :recurring_payments, :category, false
    change_column_null :recurring_payments, :start_date, false
    change_column_null :recurring_payments, :frequency, false
  end
end

