Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Authentication (Devise)
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  # Custom routes for better UX
  get "login", to: "users/sessions#new"
  post "login", to: "users/sessions#create"
  get "signup", to: "users/registrations#new"

  # Transactions (legacy - can be removed later)
  resources :transactions

  # Incomes
  resources :incomes

  # Expenses
  resources :expenses

  # Recurring Payments
  resources :recurring_payments do
    collection do
      post :generate_all_due
    end
  end

  # Dashboard
  get "dashboard", to: "dashboard#index"

  # Root
  root "dashboard#index"
end
