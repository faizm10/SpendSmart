# Finance Tracker - Deployment Notes

This document provides deployment instructions for common PaaS platforms.

## General Prerequisites

- PostgreSQL database (9.3+)
- Ruby 3.3+ runtime
- Environment variables configured
- Daily job scheduler configured

## Environment Variables

Set the following environment variables in your deployment platform:

### Required

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/database_name

# Rails
RAILS_ENV=production
SECRET_KEY_BASE=your-secret-key-base-here  # Generate with: bin/rails secret

# Devise (if using custom secret)
DEVISE_SECRET_KEY=your-devise-secret-key-here  # Optional, uses SECRET_KEY_BASE by default
```

### Optional

```bash
# Application
RAILS_LOG_TO_STDOUT=true  # Recommended for PaaS
RAILS_SERVE_STATIC_FILES=true  # If serving assets directly

# Email (if using Devise password recovery)
SMTP_ADDRESS=smtp.example.com
SMTP_PORT=587
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_DOMAIN=example.com
```

## Database Migration

After deploying, run migrations:

```bash
bin/rails db:migrate
```

**Note**: Some platforms run migrations automatically on deploy. Check your platform's documentation.

## Daily Job Scheduling

The recurring payments processor must run daily. Configure based on your platform:

### Option 1: Rake Task (Recommended for Simple Deployments)

Set up a cron job or scheduled task to run:

```bash
bin/rails recurring_payments:process
```

### Option 2: ActiveJob (Recommended for Production)

Use a job scheduler to enqueue `ProcessRecurringPaymentsJob` daily.

## Platform-Specific Instructions

### Heroku

#### 1. Create App and Database

```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
```

#### 2. Set Environment Variables

```bash
heroku config:set RAILS_ENV=production
heroku config:set SECRET_KEY_BASE=$(bin/rails secret)
```

#### 3. Deploy

```bash
git push heroku main
heroku run bin/rails db:migrate
heroku run bin/rails db:seed  # Optional
```

#### 4. Schedule Daily Job

**Using Heroku Scheduler** (free addon):

1. Install: `heroku addons:create scheduler:standard`
2. Open: `heroku addons:open scheduler`
3. Add job:
   - Command: `bin/rails recurring_payments:process`
   - Frequency: Daily
   - Time: 02:00 UTC (or your preferred time)

**Using ActiveJob with Sidekiq**:

1. Add to Gemfile: `gem 'sidekiq'`
2. Add to Procfile: `worker: bundle exec sidekiq -c 5`
3. Use `sidekiq-cron` gem for scheduling
4. Scale worker: `heroku ps:scale worker=1`

### Render

#### 1. Create Services

- **Web Service**: Rails app
- **PostgreSQL Database**: Managed PostgreSQL
- **Background Worker** (optional): For ActiveJob

#### 2. Environment Variables

Set in Render dashboard:
- `RAILS_ENV=production`
- `SECRET_KEY_BASE` (generate with `bin/rails secret`)
- `DATABASE_URL` (auto-provided by Render)

#### 3. Build Command

```bash
bundle install && bin/rails assets:precompile
```

#### 4. Start Command

```bash
bin/rails server -p $PORT
```

#### 5. Schedule Daily Job

**Option A: Cron Job** (in a separate Background Worker service):
- Command: `bin/rails recurring_payments:process`
- Schedule: `0 2 * * *` (daily at 2 AM)

**Option B: ActiveJob with Sidekiq**:
- Create Background Worker service
- Use `sidekiq-cron` for scheduling

### Fly.io

#### 1. Initialize

```bash
fly launch
fly postgres create --name your-db-name
fly postgres attach your-db-name
```

#### 2. Set Secrets

```bash
fly secrets set SECRET_KEY_BASE=$(bin/rails secret)
fly secrets set RAILS_ENV=production
```

#### 3. Deploy

```bash
fly deploy
fly ssh console -C "bin/rails db:migrate"
```

#### 4. Schedule Daily Job

Add to `fly.toml`:

```toml
[[services]]
  [[services.ports]]
    port = 80

[[vm]]
  cpu_kind = "shared"
  cpus = 1
  memory_mb = 512
```

Use `fly cron` or a separate worker process with cron.

### Railway

#### 1. Create Project

- Connect GitHub repository
- Add PostgreSQL service
- Add Web Service

#### 2. Environment Variables

Set in Railway dashboard:
- `RAILS_ENV=production`
- `SECRET_KEY_BASE`
- `DATABASE_URL` (auto-provided)

#### 3. Deploy

Railway auto-detects Rails and deploys. Run migrations:

```bash
railway run bin/rails db:migrate
```

#### 4. Schedule Daily Job

Use Railway's Cron Jobs feature or deploy a separate worker service.

### DigitalOcean App Platform

#### 1. Create App

- Connect repository
- Add PostgreSQL database component
- Add Web Service component

#### 2. Environment Variables

Set in App Platform dashboard:
- `RAILS_ENV=production`
- `SECRET_KEY_BASE`
- `DATABASE_URL` (auto-provided)

#### 3. Build and Run Commands

- Build: `bundle install && bin/rails assets:precompile`
- Run: `bundle exec puma -C config/puma.rb`

#### 4. Schedule Daily Job

Use DigitalOcean's Scheduled Jobs feature or deploy a worker component.

## ActiveJob Configuration

If using ActiveJob for recurring payments, configure the queue adapter in `config/environments/production.rb`:

```ruby
config.active_job.queue_adapter = :solid_queue  # Rails 8 default
# Or use:
# config.active_job.queue_adapter = :sidekiq
# config.active_job.queue_adapter = :delayed_job
```

### Using Solid Queue (Rails 8 Default)

Solid Queue is included by default. Run the worker:

```bash
bin/rails solid_queue:start
```

Schedule the job using a cron job or scheduler:

```ruby
# In an initializer or scheduler
ProcessRecurringPaymentsJob.set(wait_until: Date.tomorrow.beginning_of_day + 2.hours).perform_later
```

### Using Sidekiq

1. Add to Gemfile: `gem 'sidekiq'`
2. Configure in `config/application.rb`:
   ```ruby
   config.active_job.queue_adapter = :sidekiq
   ```
3. Add to Procfile: `worker: bundle exec sidekiq`
4. Use `sidekiq-cron` gem for scheduling

## Health Check

The app includes a health check endpoint at `/up`. Configure your platform to use this for health monitoring.

## Monitoring

### Logs

Monitor application logs for:
- Recurring payment processing errors
- Database connection issues
- Job failures

### Metrics to Watch

- Number of recurring payments processed daily
- Failed payment generations
- Database query performance
- Job queue depth

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check database is accessible from your app
- Ensure database migrations have run

### Jobs Not Running

- Verify scheduler is configured correctly
- Check job queue adapter is running
- Review logs for job errors
- Test manually: `bin/rails recurring_payments:process`

### Devise Issues

- Ensure `SECRET_KEY_BASE` is set
- Verify Devise migrations have run
- Check email configuration if using password recovery

## Security Checklist

- [ ] `SECRET_KEY_BASE` is set and secure
- [ ] Database credentials are not in code
- [ ] HTTPS is enabled
- [ ] CSRF protection is enabled (Rails default)
- [ ] Database has proper access controls
- [ ] Environment variables are not logged
- [ ] Regular security updates are applied

## Backup Strategy

1. **Database Backups**: Use your platform's automated backup feature
2. **Manual Backup**: `pg_dump` or platform-specific backup tool
3. **Frequency**: Daily backups recommended, retain for 30 days

## Post-Deployment Verification

1. ✅ Application loads at root URL
2. ✅ User registration works
3. ✅ User login works
4. ✅ Can create income entries
5. ✅ Can create expense entries
6. ✅ Can create recurring payments
7. ✅ Daily job processes recurring payments
8. ✅ Dashboard shows correct totals
9. ✅ Health check endpoint returns 200

## Support

For issues, check:
- Application logs
- Database logs
- Job scheduler logs
- Platform-specific documentation

