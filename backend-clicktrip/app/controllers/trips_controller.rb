class TripsController < ApplicationController

    def index
        trips = Trip.all
        render json: trips
    end

    def create
        trip = Trip.new(trip_params)
        if trip.save
            flash.now[:message] = "Trip successfully created!"
            render json: trip
        else 
            flash.now[:message] = "Error: #{trip.errors.full_messages[0]}"
            render json: trip.errors.full_messages[0].to_json
        end
    end

    def update
        trip = Trip.find(params[:id])
        render json: trip.update(trip_params)
    end

    def destry
        trip = Trip.find(params[:id])
        trip.delete
    end

    private

    def trip_params(params)
        params.require(:trip).request(:user_id, :num_people, :start_date, :end_date, :origin_city_name, :origin_city_iata, :destination_city_name, :destination_city_iata, :budget)
    end

end