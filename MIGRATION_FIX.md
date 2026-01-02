# Migration Fix Instructions

The migration `20250101000004_add_devise_to_users` partially ran and failed on the index creation.

## Solution

### Option 1: Rollback and Re-run (Recommended)

```bash
cd finance_tracker

# Rollback the failed migration
bin/rails db:migrate:down VERSION=20250101000004

# Re-run all migrations (with the fix)
bin/rails db:migrate
```

### Option 2: If rollback doesn't work, manually fix

If the rollback fails because the password_digest column was already removed, you can:

1. Manually mark the migration as run:
```bash
bin/rails db:migrate:status
# Note the version number, then:
bin/rails runner "ActiveRecord::SchemaMigration.create!(version: '20250101000004')"
```

2. Then continue with remaining migrations:
```bash
bin/rails db:migrate
```

### Option 3: Reset database (Development only - will lose data!)

```bash
bin/rails db:reset
```

This will drop, create, migrate, and seed the database.

## What was fixed

The migration now checks if indexes exist before trying to create them:
- `add_index :users, :email, unique: true unless index_exists?(:users, :email)`
- `add_index :users, :reset_password_token, unique: true unless index_exists?(:users, :reset_password_token)`

