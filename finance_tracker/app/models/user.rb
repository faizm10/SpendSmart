class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  has_many :incomes, dependent: :destroy
  has_many :expenses, dependent: :destroy
  has_many :recurring_payments, dependent: :destroy
  has_many :recurring_payment_runs, through: :recurring_payments

  # Legacy transaction support (if needed during migration)
  has_many :transactions, dependent: :destroy
end


