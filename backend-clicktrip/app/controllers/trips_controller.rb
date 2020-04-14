class TripsController < ApplicationController

    def index
        trips = Trip.all
        render json: trips
    end

    def show
        trip = Trip.find(params[:id])
        render json: trip, :include => [:flights, :hotels, :activities]
    end

    def create
        trip = Trip.new(trip_params)
        trip.duration = (Date.strptime(trip.end_date,"%m-%d-%Y") - Date.strptime(trip.start_date,"%m-%d-%Y")).to_i
        if trip.save
            puts "Trip successfully created!"
            render json: trip
        else 
            puts "Error: #{trip.errors.full_messages[0]}"
            render json: trip.errors.full_messages[0].to_json
        end
    end

    def update
        trip = Trip.find(params[:id])
        render json: trip.update(trip_params)
    end

    def destroy
        puts "PARAMSSSSSSS"
        puts params
        trip = Trip.find(params[:id])
        trip.delete
    end

    private

    def trip_params(*args)
        params.require(:trip).permit(:user_id, :num_people, :start_date, :end_date, :origin_city_name, :origin_city_iata, :destination_city_name, :destination_city_iata, :budget)
        # :user_id, :num_people, :start_date, :end_date, :origin_city_name, :origin_city_iata, :destination_city_name, :destination_city_iata, :budget
    end

end