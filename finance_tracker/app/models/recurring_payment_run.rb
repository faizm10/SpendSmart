class RecurringPaymentRun < ApplicationRecord
  belongs_to :recurring_payment
  belongs_to :expense, optional: true

  validates :run_date, presence: true
  validates :recurring_payment_id, uniqueness: { scope: :run_date, message: "has already been run for this date" }

  scope :successful, -> { where(success: true) }
  scope :failed, -> { where(success: false) }
  scope :for_date, ->(date) { where(run_date: date) }
end

