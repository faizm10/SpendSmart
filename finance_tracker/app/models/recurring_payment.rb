class RecurringPayment < ApplicationRecord
  belongs_to :user

  enum :transaction_type, { income: "income", expense: "expense" }

  validates :name, presence: true
  validates :transaction_type, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :day_of_month, presence: true, inclusion: { in: 1..28 }
  validates :next_run_on, presence: true

  scope :active, -> { where(active: true) }
  scope :due, ->(date = Date.current) { active.where("next_run_on <= ?", date) }
  scope :upcoming, ->(date = Date.current) { active.where("next_run_on > ?", date).order(:next_run_on) }

  def advance_next_run_date
    self.next_run_on = next_run_on.next_month
  end
end

