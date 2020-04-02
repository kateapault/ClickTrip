require 'rest-client'
require 'rails/configuration'

require 'uri'
require 'net/https'

# url = URI("https://api.travelpayouts.com/v1/airline-directions?airline_code=SU&limit=10")

# http = Net::HTTP.new(url.host, url.port)

# request = Net::HTTP::Get.new(url)
# request["x-access-token"] = '321d6a221f8926b5ec41ae89a3b2ae7b'

# response = http.request(request)
# puts response.read_body

# TravelPayouts API Endpoint - flights
travelpayouts_url = URI('http://api.travelpayouts.com/v1/city-directions?origin=MOW&currency=usd')
http_travelpayouts = Net::HTTP.new(travelpayouts_url.host, travelpayouts_url.port)
request = Net::HTTP::Get.new(travelpayouts_url)
request["x-access-token"] = ENV["TRAVELPAYOUTS_KEY"]
puts "KEY: #{ENV["TRAVELPAYOUTS_KEY"]}"
response = http_travelpayouts.request(request)
puts response.read_body

# Hotelbeds API Endpoint - hotels
apitude_hotels_url = ''

# Amadeus API Endpoint - hotels
amadeus_url = ''

# Hotelbeds API Endpoint - activities
apitude_activities_url = ''

# Yelp API Endpoint - activities
yelp_url = ''


# RestClient get rquest to TravelPayouts endpoint
# data = JSON.parse(RestClient.get("#{travelpayouts_url}#{ENV["TRAVELPAYOUTSKEY"]}"))
# puts "DATA:::"
# puts data


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