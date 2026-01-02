namespace :recurring_payments do
  desc "Process all due recurring payments for today (or specified date)"
  task :process, [:date] => :environment do |_t, args|
    date = args[:date] ? Date.parse(args[:date]) : Date.current
    
    puts "Processing recurring payments for #{date}..."
    
    results = RecurringPayments::RunDue.call(date: date)
    
    puts "✓ Processed: #{results[:processed]}"
    puts "⊘ Skipped: #{results[:skipped]}"
    
    if results[:errors].any?
      puts "✗ Errors: #{results[:errors].count}"
      results[:errors].each { |error| puts "  - #{error}" }
    else
      puts "✓ No errors"
    end
  end

  desc "Process recurring payments for all users (for a specific date)"
  task :process_all, [:date] => :environment do |_t, args|
    date = args[:date] ? Date.parse(args[:date]) : Date.current
    
    puts "Processing recurring payments for all users on #{date}..."
    
    User.find_each do |user|
      puts "Processing for user: #{user.email}"
      results = RecurringPayments::RunDue.call(user: user, date: date)
      puts "  Processed: #{results[:processed]}, Skipped: #{results[:skipped]}"
    end
  end
end

