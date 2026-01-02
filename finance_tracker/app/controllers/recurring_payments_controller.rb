class RecurringPaymentsController < ApplicationController
  before_action :set_recurring_payment, only: [:show, :edit, :update, :destroy]

  def index
    @recurring_payments = current_user.recurring_payments.order(:name)
  end

  def show
  end

  def new
    @recurring_payment = current_user.recurring_payments.build
  end

  def create
    @recurring_payment = current_user.recurring_payments.build(recurring_payment_params)

    if @recurring_payment.save
      redirect_to @recurring_payment, notice: "Recurring payment created successfully"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @recurring_payment.update(recurring_payment_params)
      redirect_to @recurring_payment, notice: "Recurring payment updated successfully"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @recurring_payment.destroy
    redirect_to recurring_payments_path, notice: "Recurring payment deleted successfully"
  end

  def generate_all_due
    count = RecurringPaymentGenerator.generate_due_payments(current_user)
    redirect_to recurring_payments_path, notice: "Generated #{count} transaction(s) from due recurring payments"
  end

  private

  def set_recurring_payment
    @recurring_payment = current_user.recurring_payments.find(params[:id])
  end

  def recurring_payment_params
    params.require(:recurring_payment).permit(:name, :transaction_type, :amount, :day_of_month, :next_run_on, :active)
  end
end

