class TripsController < ApplicationController

    def index
        @trips = Trip.all

        render json: 
    end

    def create

    end

    def update
    end

    def destroy
    end

end