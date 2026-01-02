class User < ApplicationRecord
  has_secure_password

  has_many :transactions, dependent: :destroy
  has_many :recurring_payments, dependent: :destroy

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, if: -> { new_record? || !password.nil? }
end

