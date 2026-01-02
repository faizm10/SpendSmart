class Users::SessionsController < Devise::SessionsController
  # GET /resource/sign_in
  def new
    redirect_to dashboard_path if user_signed_in?
    super
  end

  # POST /resource/sign_in
  def create
    super do |resource|
      redirect_to dashboard_path, notice: "Welcome back!" and return if resource.persisted?
    end
  end

  # DELETE /resource/sign_out
  def destroy
    super do
      redirect_to new_user_session_path, notice: "Logged out successfully" and return
    end
  end
end

