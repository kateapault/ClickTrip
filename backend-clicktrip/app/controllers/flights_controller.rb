class FlightsController < ApplicationController
    def index
        @flights = Flight.all
        render json: @flights
    end

    def create
        flight = Flight.new(flight_params)

        if flight.save
            puts 'flight added!'
            render json: flight
        else
            puts 'error! flight not added'
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
        puts "params:"
        puts params
        flights = {
            a:{departure_airport: 'NYC',
            departure_date: '2020-05-01',
            departure_time: '19:22',
            arrival_airport: 'DUB',
            arrival_date:'2020-05-02',
            arrival_time: '06:31',
            airline: 'AA',
            flight_number: '773',
            stops: '0',
            price: '254.32'},

            b:{departure_airport: 'NYC',
            departure_date: '2020-05-01',
            departure_time: '11:42',
            arrival_airport: 'RKV',
            arrival_date:'2020-05-02',
            arrival_time: '17:09',
            airline: 'IA',
            flight_number: '1713',
            stops: '0',
            price: '199.32'},

            c:{departure_airport: 'NYC',
            departure_date: '2020-05-01',
            departure_time: '08:10',
            arrival_airport: 'MEX',
            arrival_date:'2020-05-02',
            arrival_time: '17:33',
            airline: 'MA',
            flight_number: '34B4',
            stops: '1',
            price: '144.22'},

            d:{departure_airport: 'DUB',
            departure_date: '2020-05-10',
            departure_time: '08:39',
            arrival_airport: 'NYC',
            arrival_date:'2020-05-10',
            arrival_time: '11:47',
            airline: 'AL',
            flight_number: '874',
            stops: '0',
            price: '228.82'},

            e:{departure_airport: 'DUB',
            departure_date: '2020-05-10',
            departure_time: '10:37',
            arrival_airport: 'NYC',
            arrival_date:'2020-05-10',
            arrival_time: '13:31',
            airline: 'AA',
            flight_number: '290',
            stops: '0',
            price: '239.44'},

            f:{departure_airport: 'DUB',
            departure_date: '2020-05-10',
            departure_time: '09:04',
            arrival_airport: 'NYC',
            arrival_date:'2020-05-10',
            arrival_time: '20:08',
            airline: 'IA',
            flight_number: 'I978',
            stops: '1',
            price: '174.96'},

            g:{departure_airport: 'NYC',
            departure_date: '2020-05-01',
            departure_time: '19:04',
            arrival_airport: 'LON',
            arrival_date:'2020-05-02',
            arrival_time: '7:46',
            airline: 'DLT',
            flight_number: '1881',
            stops: '1',
            price: '234.96'},

            h:{departure_airport: 'NYC',
            departure_date: '2020-05-01',
            departure_time: '10:20',
            arrival_airport: 'LAX',
            arrival_date:'2020-05-01',
            arrival_time: '22:08',
            airline: 'UTD',
            flight_number: '980',
            stops: '1',
            price: '106.55'},
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
        params.require(:flight).permit(:trip_id,:departure_airport,:departure_time,:departure_date,:arrival_airport,:arrival_date,:arrival_time,:ticket_price,:airline,:flight_num,:num_stops)
    end

end