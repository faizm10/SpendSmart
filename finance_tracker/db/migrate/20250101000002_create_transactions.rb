class CreateTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :transaction_type, null: false
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.date :date, null: false
      t.string :description
      t.string :category

      t.timestamps
    end

    add_index :transactions, [:user_id, :date]
    add_index :transactions, [:user_id, :transaction_type]
  end
end

