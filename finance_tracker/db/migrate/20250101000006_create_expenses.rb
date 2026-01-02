class CreateExpenses < ActiveRecord::Migration[8.0]
  def change
    create_table :expenses do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.date :date, null: false
      t.string :category, null: false
      t.string :merchant
      t.text :note
      t.references :recurring_payment, null: true, foreign_key: true

      t.timestamps
    end

    add_index :expenses, [:user_id, :date]
    add_index :expenses, [:user_id, :category]
    add_index :expenses, :date
    add_index :expenses, :recurring_payment_id
  end
end

