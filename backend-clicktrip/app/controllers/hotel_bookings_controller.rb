class HotelBookingsController < ApplicationController

    def index
        hotel_bookings = HotelBooking.all
        render json: hotel_bookings
    end

    def create
    end

    def update
    end

    def destroy
    end

end