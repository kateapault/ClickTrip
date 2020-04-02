class FlightsController < ApplicationController
    def index
        @flights = Flight.all
        render json: @flights
    end

    def create

        


        # t.string "departure_airport"
        # t.time "departure_time"
        # t.date "departure_date"
        # t.string "arrival_airport"
        # t.time "arrival_time"
        # t.date "arrival_date"
        # t.string "airline"
        # t.string "flight_num"
        # t.integer "num_stops"
    end
end