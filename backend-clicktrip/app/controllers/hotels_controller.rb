class HotelsController < ApplicationController

    def index
        @hotels = Hotel.all
        render json: @hotels
    end

    def create
        hotel = Hotel.new(hotel_params)

        if hotel.save
            puts 'hotel added!'
            render json: hotel
        else
            puts 'error! hotel not added'
            render json: {error:hotel.save.error}
        end
    end

    def update
        hotel = Hotel.find(params[:id])
        render json: hotel.update(hotel_params)
    end

    ##################################################################################
    ### DUMMY DATA ###################################################################
    ##################################################################################

    def dummysearch
        
        hotels = [
        {name: 'Mariott Residence',
        address: '123 Main St, Dublin, Ireland',
        lat: '',
        long:'',
        company: 'Mariott',
        checkin_date: '2020-05-12',
        checkout_date: '2020-5-20',
        price: '186.67',
        rating: '4'},
        {name: 'Hotel Eire',
        address: '333 Lucky Lane, Dublin, Ireland',
        lat: '',
        long:'',
        company: 'Shamrock Inc',
        checkin_date: '2020-05-12',
        checkout_date: '2020-5-20',
        price: '166.60',
        rating: '3.5'},
        {name: 'Hilton DUB',
        address: '2 Ulster Ave, Dublin, Ireland',
        lat: '',
        long:'',
        company: 'Hilton',
        checkin_date: '2020-05-12',
        checkout_date: '2020-5-20',
        price: '211.17',
        rating: '4.5'}
        ]
        
        render json: hotels
    end


    ##################################################################################
    ### EXTERNAL DATA ################################################################
    ##################################################################################

    def search
        # response = HTTParty.get('https://api.test.hotelbeds.com/activity-content-api/3.0/destinations/en/FR')     
    end

    private

    def hotel_params
        params.require(:hotel).permit(:trip_id,:lat,:long,:address,:company,:price,:checkin,:checkout)
    end
end