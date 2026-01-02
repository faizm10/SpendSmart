class Transaction < ApplicationRecord
  belongs_to :user

  enum :transaction_type, { income: "income", expense: "expense" }

  validates :transaction_type, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true
  validates :category, presence: true

  scope :for_month, ->(date) { where(date: date.beginning_of_month..date.end_of_month) }
  scope :by_type, ->(type) { where(transaction_type: type) }
  scope :recent, -> { order(date: :desc, created_at: :desc) }
end

