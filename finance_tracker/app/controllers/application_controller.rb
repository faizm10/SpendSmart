class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :authenticate_user!

  # Devise provides current_user automatically, but we can add a helper for compatibility
  helper_method :logged_in?

  private

  def logged_in?
    user_signed_in?
  end
end
