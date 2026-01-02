class Users::RegistrationsController < Devise::RegistrationsController
  # GET /resource/sign_up
  def new
    redirect_to dashboard_path if user_signed_in?
    super
  end

  # POST /resource
  def create
    super do |resource|
      if resource.persisted?
        redirect_to dashboard_path, notice: "Account created successfully!" and return
      end
    end
  end

  protected

  def after_sign_up_path_for(resource)
    dashboard_path
  end

  def after_sign_in_path_for(resource)
    dashboard_path
  end
end

