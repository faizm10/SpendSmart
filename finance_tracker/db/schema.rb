# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_01_01_000009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "expenses", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.date "date", null: false
    t.string "category", null: false
    t.string "merchant"
    t.text "note"
    t.bigint "recurring_payment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_expenses_on_date"
    t.index ["recurring_payment_id"], name: "index_expenses_on_recurring_payment_id"
    t.index ["user_id", "category"], name: "index_expenses_on_user_id_and_category"
    t.index ["user_id", "date"], name: "index_expenses_on_user_id_and_date"
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "incomes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.date "date", null: false
    t.string "category", null: false
    t.text "note"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["date"], name: "index_incomes_on_date"
    t.index ["user_id", "category"], name: "index_incomes_on_user_id_and_category"
    t.index ["user_id", "date"], name: "index_incomes_on_user_id_and_date"
    t.index ["user_id"], name: "index_incomes_on_user_id"
  end

  create_table "recurring_payment_runs", force: :cascade do |t|
    t.bigint "recurring_payment_id", null: false
    t.bigint "expense_id"
    t.date "run_date", null: false
    t.boolean "success", default: true, null: false
    t.text "error_message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["expense_id"], name: "index_recurring_payment_runs_on_expense_id"
    t.index ["recurring_payment_id", "run_date"], name: "index_recurring_payment_runs_on_payment_and_date", unique: true
    t.index ["recurring_payment_id"], name: "index_recurring_payment_runs_on_recurring_payment_id"
    t.index ["run_date"], name: "index_recurring_payment_runs_on_run_date"
  end

  create_table "recurring_payments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name", null: false
    t.string "transaction_type", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.integer "day_of_month"
    t.date "next_run_on", null: false
    t.boolean "active", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category", null: false
    t.date "start_date", null: false
    t.date "end_date"
    t.integer "frequency", default: 2, null: false
    t.integer "day_of_week"
    t.index ["next_run_on"], name: "index_recurring_payments_on_next_run_on"
    t.index ["user_id", "active"], name: "index_recurring_payments_on_user_id_and_active"
    t.index ["user_id"], name: "index_recurring_payments_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "transaction_type", null: false
    t.decimal "amount", precision: 10, scale: 2, null: false
    t.date "date", null: false
    t.string "description"
    t.string "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "date"], name: "index_transactions_on_user_id_and_date"
    t.index ["user_id", "transaction_type"], name: "index_transactions_on_user_id_and_transaction_type"
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "expenses", "recurring_payments"
  add_foreign_key "expenses", "users"
  add_foreign_key "incomes", "users"
  add_foreign_key "recurring_payment_runs", "expenses"
  add_foreign_key "recurring_payment_runs", "recurring_payments"
  add_foreign_key "recurring_payments", "users"
  add_foreign_key "transactions", "users"
end
