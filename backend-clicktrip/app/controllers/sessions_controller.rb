class SessionsController < ApplicationController
    def new
    end

    def create
        user = User.find_by_email(params[:email])
        if user && user.authenticate(params[:password])
            session[:user_id] = user.id
        else
            flash.now[:alert] = "Email or password is invalid"
        end
    end

    def destroy
        session[:user_id] = nil
    end
end