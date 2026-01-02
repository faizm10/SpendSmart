class ProcessRecurringPaymentsJob < ApplicationJob
  queue_as :default

  def perform(date = Date.current)
    results = RecurringPayments::RunDue.call(date: date)
    
    Rails.logger.info "Processed #{results[:processed]} recurring payments, " \
                      "skipped #{results[:skipped]}, " \
                      "errors: #{results[:errors].count}"
    
    if results[:errors].any?
      Rails.logger.error "Errors processing recurring payments: #{results[:errors].join(', ')}"
    end

    results
  end
end

