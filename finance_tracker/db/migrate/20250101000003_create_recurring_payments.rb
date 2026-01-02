class CreateRecurringPayments < ActiveRecord::Migration[8.0]
  def change
    create_table :recurring_payments do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :transaction_type, null: false
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.integer :day_of_month, null: false
      t.date :next_run_on, null: false
      t.boolean :active, default: true, null: false

      t.timestamps
    end

    add_index :recurring_payments, [:user_id, :active]
    add_index :recurring_payments, :next_run_on
  end
end

