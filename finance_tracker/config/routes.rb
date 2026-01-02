Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Authentication
  get "login", to: "sessions#new"
  post "login", to: "sessions#create"
  delete "logout", to: "sessions#destroy"
  resources :users, only: [:new, :create]

  # Transactions
  resources :transactions

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
