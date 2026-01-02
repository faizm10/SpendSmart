class Expense < ApplicationRecord
  belongs_to :user
  belongs_to :recurring_payment, optional: true

  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :date, presence: true
  validates :category, presence: true

  scope :for_month, ->(date) { where(date: date.beginning_of_month..date.end_of_month) }
  scope :recent, -> { order(date: :desc, created_at: :desc) }
  scope :by_category, ->(category) { where(category: category) }
  scope :by_merchant, ->(merchant) { where(merchant: merchant) }
end

