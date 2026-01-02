class CreateRecurringPaymentRuns < ActiveRecord::Migration[8.0]
  def change
    create_table :recurring_payment_runs do |t|
      t.references :recurring_payment, null: false, foreign_key: true
      t.references :expense, null: true, foreign_key: true
      t.date :run_date, null: false
      t.boolean :success, default: true, null: false
      t.text :error_message

      t.timestamps
    end

    # Prevent duplicate runs for same recurring_payment + date
    add_index :recurring_payment_runs, 
              [:recurring_payment_id, :run_date], 
              unique: true, 
              name: "index_recurring_payment_runs_on_payment_and_date"
    add_index :recurring_payment_runs, :run_date
  end
end

