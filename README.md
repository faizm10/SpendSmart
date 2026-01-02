# SpendSmart - Finance Tracker

A Rails-based personal finance tracking application that helps you manage transactions and recurring payments.

## Prerequisites

- Ruby (check `Gemfile` for required version)
- PostgreSQL (9.3 or higher)
- Bundler gem

## Setup

1. **Install dependencies:**
   ```bash
   cd finance_tracker
   bundle install
   ```

2. **Set up the database:**
   ```bash
   # Make sure PostgreSQL is running
   # Create and migrate the database
   bin/rails db:create
   bin/rails db:migrate
   ```

## Running the Application

### Option 1: Using Rails Server (Recommended)

Start the Rails server:
```bash
cd finance_tracker
bin/rails server
```

The application will be available at **http://localhost:3000**

### Option 2: Using Foreman (with Tailwind CSS watcher)

If you have `foreman` installed and want to run both the Rails server and Tailwind CSS watcher:
```bash
cd finance_tracker
foreman start -f Procfile.dev
```

Or if you have a `bin/dev` script:
```bash
cd finance_tracker
bin/dev
```

This will start:
- Rails server on port 3000
- Tailwind CSS watcher for live CSS compilation

## Database

The application uses PostgreSQL. Make sure PostgreSQL is running before starting the server:

```bash
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432
```

## Development

- The application runs in development mode by default
- Logs are available in `finance_tracker/log/development.log`
- Database: `finance_tracker_development`

## Stopping the Server

Press `Ctrl+C` in the terminal where the server is running, or find and kill the process:
```bash
lsof -ti:3000 | xargs kill
```

