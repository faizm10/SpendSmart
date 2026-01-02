class TransactionsController < ApplicationController
  before_action :set_transaction, only: [:show, :edit, :update, :destroy]

  def index
    @transactions = current_user.transactions.recent

    # Filter by month
    if params[:month].present?
      month_date = Date.parse("#{params[:month]}-01") rescue Date.current
      @transactions = @transactions.for_month(month_date)
    else
      @transactions = @transactions.for_month(Date.current)
    end

    # Filter by type
    @transactions = @transactions.by_type(params[:type]) if params[:type].present?

    @current_month = params[:month].present? ? Date.parse("#{params[:month]}-01") : Date.current
  end

  def show
  end

  def new
    @transaction = current_user.transactions.build
  end

  def create
    @transaction = current_user.transactions.build(transaction_params)

    if @transaction.save
      redirect_to @transaction, notice: "Transaction created successfully"
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
  end

  def update
    if @transaction.update(transaction_params)
      redirect_to @transaction, notice: "Transaction updated successfully"
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @transaction.destroy
    redirect_to transactions_path, notice: "Transaction deleted successfully"
  end

  private

  def set_transaction
    @transaction = current_user.transactions.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(:transaction_type, :amount, :date, :description, :category)
  end
end

