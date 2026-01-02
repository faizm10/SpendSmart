class RecurringPayment < ApplicationRecord
  belongs_to :user
  has_many :recurring_payment_runs, dependent: :destroy
  has_many :expenses, dependent: :destroy

  enum frequency: {
    weekly: 0,
    biweekly: 1,
    monthly: 2,
    yearly: 3
  }

  enum transaction_type: {
    income: "income",
    expense: "expense"
  }

  validates :name, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :category, presence: true
  validates :start_date, presence: true
  validates :frequency, presence: true
  validates :next_run_on, presence: true
  validates :day_of_month, inclusion: { in: 1..31 }, allow_nil: true
  validates :day_of_week, inclusion: { in: 0..6 }, allow_nil: true
  validate :end_date_after_start_date, if: -> { end_date.present? }
  validate :frequency_specific_fields

  scope :active, -> { where(active: true) }
  scope :due, ->(date = Date.current) { 
    active.where("next_run_on <= ?", date)
          .where("start_date <= ?", date)
          .where("end_date IS NULL OR end_date >= ?", date)
  }
  scope :upcoming, ->(date = Date.current) { 
    active.where("next_run_on > ?", date).order(:next_run_on) 
  }

  def advance_next_run_date
    case frequency
    when "weekly"
      self.next_run_on = next_run_on + 1.week
    when "biweekly"
      self.next_run_on = next_run_on + 2.weeks
    when "monthly"
      # Handle months with different day counts
      new_date = next_run_on + 1.month
      # If day_of_month is 31 and next month has fewer days, use last day of month
      if day_of_month && day_of_month > 28
        last_day = new_date.end_of_month.day
        day_to_use = [day_of_month, last_day].min
        self.next_run_on = Date.new(new_date.year, new_date.month, day_to_use)
      else
        self.next_run_on = new_date
      end
    when "yearly"
      self.next_run_on = next_run_on + 1.year
    end
  end

  def due_on?(date = Date.current)
    return false unless active?
    return false if date < start_date
    return false if end_date && date > end_date
    next_run_on <= date
  end

  def pause!
    update(active: false)
  end

  def resume!
    update(active: true)
  end

  private

  def end_date_after_start_date
    if end_date && start_date && end_date < start_date
      errors.add(:end_date, "must be after start date")
    end
  end

  def frequency_specific_fields
    case frequency
    when "weekly", "biweekly"
      errors.add(:day_of_week, "is required for #{frequency} frequency") if day_of_week.nil?
    when "monthly"
      errors.add(:day_of_month, "is required for monthly frequency") if day_of_month.nil?
    when "yearly"
      errors.add(:day_of_month, "is required for yearly frequency") if day_of_month.nil?
    end
  end
end
