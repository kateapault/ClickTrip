class FlightBookingsController < ApplicationController
    def index
        @flight_bookings = FlightBooking.all
        render json: @flight_bookings
    end

    def create
    end

    def update
    end

    def destroy
    end
end