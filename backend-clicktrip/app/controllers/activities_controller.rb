class ActivitiesController < ApplicationController

    def index
        @activities = Activity.all
        render json: @activities
    end

    def create
    end
end