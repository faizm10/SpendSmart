class RecurringPaymentGenerator
  def self.generate_due_payments(user, date = Date.current)
    new(user, date).generate
  end

  def initialize(user, date = Date.current)
    @user = user
    @date = date
  end

  def generate
    due_payments = @user.recurring_payments.due(@date)
    generated_count = 0

    due_payments.each do |recurring_payment|
      transaction = @user.transactions.build(
        transaction_type: recurring_payment.transaction_type,
        amount: recurring_payment.amount,
        date: @date,
        description: recurring_payment.name,
        category: "Recurring: #{recurring_payment.name}"
      )

      if transaction.save
        recurring_payment.advance_next_run_date
        recurring_payment.save
        generated_count += 1
      end
    end

    generated_count
  end
end

