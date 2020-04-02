require 'rest-client'
require 'rails/configuration'

# TravelPayouts API Endpoint - flights
travelpayouts_url = 'http://api.travelpayouts.com/'

# Hotelbeds API Endpoint - hotels
apitude_hotels_url = ''

# Amadeus API Endpoint - hotels
amadeus_url = ''

# Hotelbeds API Endpoint - activities
apitude_activities_url = ''

# Yelp API Endpoint - activities
yelp_url = ''


# RestClient get rquest to TravelPayouts endpoint
# data = JSON.parse(RestClient.get("#{travelpayouts_url}v1/city-directions?origin=NYC&currency=usd&token=#{ENV["TRAVELPAYOUTSKEY"]}"))
# console.log(data)


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