class UsersController < ApplicationController

    def show
        @user = current_user
        @profile = User.find(params[:id])
        render json: @profile
    end

    def create
        @user = User.new(user_params)

        if session[:password] == session[:password_confirmation] && @user.valid?
            flash[:message] = "User created!"
            @user.save
            session[:user_id] = @user.id
            render json: @user
        else
            flash.now[:message] = @user.errors.full_messages[0]
        end
    end

    def update
        @user = current_user
        if @user.update(user_params)
          flash[:message] = "User updated!"
          render json: @user
        else
          flash.now[:message] = "Try Again"
        end
      end

    def destroy
        @user = current_user
        @user.destroy
    end

    private

    def user_params
        params.require(:user).permit(:username, :password, :password_confirmation, :firstname, :lastname, :home_town, :home_iata)
    end

end