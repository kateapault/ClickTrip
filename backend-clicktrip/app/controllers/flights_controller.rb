class FlightsController < ApplicationController
    def index
        @flights = Flight.all
        render json: @flights
    end

    def create
        flight = Flight.new(flight_params)

        if flight.save
            flash('flight added!')
            render json: flight
        else
            flash('error! flight not added')
            render json: {error:flight.save.error}
        end
    end

    def update
        flight = Flight.find(params[:id])
        render json: flight.update(flight_params)
    end



    ##################################################################################
    ### DUMMY DATA ###################################################################
    ##################################################################################

    def dummysearch
        flights = {
            a:{departure_airport: 'NYC',
            departure_date: '2020-05-11',
            departure_time: '19:22',
            arrival_airport: 'DUB',
            arrival_date:'2020-05-12',
            arrival_time: '6:31',
            airline: 'AA',
            flight_number: '773',
            stops: '0',
            price: '654.32'},

            b:{departure_airport: 'NYC',
            departure_date: '2020-05-12',
            departure_time: '11:42',
            arrival_airport: 'DUB',
            arrival_date:'2020-05-12',
            arrival_time: '23:09',
            airline: 'AL',
            flight_number: '1713',
            stops: '0',
            price: '559.32'},

            c:{departure_airport: 'NYC',
            departure_date: '2020-05-11',
            departure_time: '22:10',
            arrival_airport: 'DUB',
            arrival_date:'2020-05-12',
            arrival_time: '12:33',
            airline: 'PA',
            flight_number: '34B4',
            stops: '1',
            price: '344.22'}
        }

        render json: flights
    end


    ##################################################################################
    ### EXTERNAL DATA ################################################################
    ##################################################################################

    def searchprice
        origin = 'NYC'
        price = 700
        start_date = '2020-05-01'   # YYYY-MM-DD
        start_month = start_date[0,7] + '-01'
        end_date = '2020-05-07' # YYYY-MM-DD
        duration = (Date.parse(end_date) - Date.parse(start_date)).to_i

        
        response = HTTParty.get("http://api.travelpayouts.com/v2/prices/month-matrix?currency=usd&origin=#{origin}&month=#{start_month}&token=#{ENV['TRAVELPAYOUTS_KEY']}&trip_duration=#{duration}")
        
        session[:flights] = response.body
        render json: response.body

    end

    def searchdest
        origin = 'NYC'
        destination = 'DUB'
        response = HTTParty.get("http://api.travelpayouts.com/v1/prices/cheap?origin=#{origin}&destination=#{destination}&currency=usd&token=#{ENV['TRAVELPAYOUTS_KEY']}")

        render json: response.body
    end

    private

    def flight_params
        params.require(:flight).permit(:trip_id,:departure_airport,:departure_time,:departure_date,:arrival_airport,:arrival_date,:arrival_time,:price,:airline,:flight_num,:num_stops)
    end

end