class ActivityBookingsController < ApplicationController
    def index
        @activity_bookings = ActivityBooking.all
        render json: @activity_bookings
    end

    def create
    end

    def update
    end

    def destroy
    end
end