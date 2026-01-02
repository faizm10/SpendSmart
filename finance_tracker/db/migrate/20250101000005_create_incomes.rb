class CreateIncomes < ActiveRecord::Migration[8.0]
  def change
    create_table :incomes do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.date :date, null: false
      t.string :category, null: false
      t.text :note

      t.timestamps
    end

    add_index :incomes, [:user_id, :date]
    add_index :incomes, [:user_id, :category]
    add_index :incomes, :date
  end
end

