module RecurringPayments
  class RunDue
    def self.call(user: nil, date: Date.current)
      new(user: user, date: date).call
    end

    def initialize(user: nil, date: Date.current)
      @user = user
      @date = date
    end

    def call
      due_payments = @user ? @user.recurring_payments.due(@date) : RecurringPayment.due(@date)
      results = { processed: 0, skipped: 0, errors: [] }

      due_payments.find_each do |recurring_payment|
        result = process_recurring_payment(recurring_payment)
        results[result[:status]] += 1
        results[:errors] << result[:error] if result[:error]
      end

      results
    end

    private

    def process_recurring_payment(recurring_payment)
      # Check if already run for this date (deduplication)
      existing_run = recurring_payment.recurring_payment_runs.find_by(run_date: @date)
      return { status: :skipped, error: nil } if existing_run

      # Only process expenses (as per requirements)
      return { status: :skipped, error: "Only expense recurring payments are processed" } unless recurring_payment.expense?

      ActiveRecord::Base.transaction do
        # Create expense
        expense = recurring_payment.user.expenses.create!(
          amount: recurring_payment.amount,
          date: @date,
          category: recurring_payment.category,
          merchant: recurring_payment.name,
          note: "Auto-generated from recurring payment: #{recurring_payment.name}",
          recurring_payment: recurring_payment
        )

        # Record the run
        recurring_payment.recurring_payment_runs.create!(
          expense: expense,
          run_date: @date,
          success: true
        )

        # Advance next_run_on
        recurring_payment.advance_next_run_date
        recurring_payment.save!

        { status: :processed, error: nil }
      end
    rescue StandardError => e
      # Record failed run
      recurring_payment.recurring_payment_runs.create!(
        run_date: @date,
        success: false,
        error_message: e.message
      )

      { status: :errors, error: "#{recurring_payment.name}: #{e.message}" }
    end
  end
end

