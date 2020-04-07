class FlightsController < ApplicationController
    def index
        @flights = Flight.all
        render json: @flights
    end

    def create
        
    end

    def search
        # url = URI("https://api.travelpayouts.com/v1/city-directions?origin=NYC&currency=usd")

        # https = Net::HTTP.new(url.host, url.port)

        # request = Net::HTTP::Get.new(url)
        # request["x-access-token"] = ENV["TRAVELPAYOUTS_KEY"]

        # response = https.request(request)
        # session[:flights] = response.read_body
        # puts response.read_body
        # render json: response.read_body

        # @data = JSON.parse(RestClient.get `https://api.travelpayouts.com/v1/city-directions?origin=NYC&currency=usd&token=#{ENV["TRAVELPAYOUTS_KEY"]}` )
        # # params = {origin = params[:origin]}
        # puts @data
        response = HTTParty.get("https://api.travelpayouts.com/v1/city-directions?origin=NYC&currency=usd&token=#{ENV['TRAVELPAYOUTS_KEY']}")
        puts 'CODE IS'
        puts response.code
        puts 'BODY IS'
        puts response.body
        
        session[:flights] = response.body
        render json: response.body

        # The popular destinations - Brings back the most popular directions from a specified city.
# Request http://api.travelpayouts.com/v1/city-directions?origin=MOW&currency=usd&token=PutHereYourToken
# Request parameters: 
# currency — the airline ticket’s The default value - RUB.
# origin — the point of departure. The IATA city code or the country code. The length - from 2 to 3 symbols.
# token — the individual affiliate token.
# Response 
# {
#     "success": true,
#     "data": {
#         "AER": {
#             "origin": "MOW",
#             "destination": "AER",
#             "price": 3673,
#             "transfers": 0,
#             "airline": "WZ",
#             "flight_number": 125,
#             "departure_at": "2016-03-08T16:35:00Z",
#             "return_at": "2016-03-17T16:05:00Z",
#             "expires_at": "2016-02-22T09:32:44Z"
#         }
#     },
#     "error": null,
#     "currency": "rub"
# }
    end

    def results
        @data = session[:flights]
        render json: @data
    end
end