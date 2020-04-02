require 'rest-client'
require 'rails/configuration'

require 'net/http'

# url = URI("https://api.travelpayouts.com/v1/airline-directions?airline_code=SU&limit=10")

# http = Net::HTTP.new(url.host, url.port)

# request = Net::HTTP::Get.new(url)
# request["x-access-token"] = '321d6a221f8926b5ec41ae89a3b2ae7b'

# response = http.request(request)
# puts response.read_body


def flights_convert_param_keys(params)
    puts params["origin"]

    puts params["departure_at"]
    modified_params = {
        departure_airport: params["origin"],
        departure_time: params["departure_at"].split("T")[1],
        departure_date: params["departure_at"].split("T")[0],
        arrival_airport: params["destination"],
        arrival_time: params["return_at"].split("T")[1],
        arrival_date: params["return_at"].split("T")[0],
        airline: params["airline"],
        flight_num: params["flight_number"],
        num_stops: params["transfers"],
        price: params["price"]
    }

    return modified_params
end


# TravelPayouts API Endpoint - flights
# travelpayouts_url = URI('http://api.travelpayouts.com/v1/city-directions?origin=MOW&currency=usd')
# http_travelpayouts = Net::HTTP.new(travelpayouts_url.host, travelpayouts_url.port)
# request = Net::HTTP::Get.new(travelpayouts_url)
# request["x-access-token"] = ENV["TRAVELPAYOUTS_KEY"]
# puts "KEY: #{ENV["TRAVELPAYOUTS_KEY"]}"
# response = http_travelpayouts.request(request)
# x = response.read_body
# puts "X IS"
# puts "#{x}"
# puts "OF TYPE #{x.class}"
# puts "RESPONSE DOT READ BODY IS"
# puts "#{response.read_body}"
# puts "OF TYPE #{response.read_body.class}"

# {"success":true,"data":{"AER":{"origin":"MOW","destination":"AER","price":28,"transfers":0,"airline":"UT","flight_number":267,"departure_at":"2020-04-17T16:15:00Z","return_at":"2020-04-18T19:30:00Z","expires_at":"2020-04-05T15:48:55Z"},"BKK":{"origin":"MOW","destination":"BKK","price":329,"transfers":1,"airline":"GF","flight_number":15,"departure_at":"2020-04-30T14:50:00Z","return_at":"2020-06-06T21:35:00Z","expires_at":"2020-04-05T16:44:05Z"},"IKT":{"origin":"MOW","destination":"IKT","price":89,"transfers":0,"airline":"U6","flight_number":105,"departure_at":"2020-04-19T19:15:00Z","return_at":"2020-04-23T07:20:00Z","expires_at":"2020-04-03T21:46:19Z"},"KGD":{"origin":"MOW","destination":"KGD","price":25,"transfers":0,"airline":"UT","flight_number":389,"departure_at":"2020-04-07T07:10:00Z","return_at":"2020-04-14T09:00:00Z","expires_at":"2020-04-05T18:52:17Z"},"KRR":{"origin":"MOW","destination":"KRR","price":28,"transfers":0,"airline":"UT","flight_number":523,"departure_at":"2020-04-12T16:20:00Z","return_at":"2020-04-19T19:25:00Z","expires_at":"2020-04-04T21:20:40Z"},"LED":{"origin":"MOW","destination":"LED","price":25,"transfers":0,"airline":"U6","flight_number":79,"departure_at":"2020-04-24T10:10:00Z","return_at":"2020-04-24T16:05:00Z","expires_at":"2020-04-05T06:10:49Z"},"MCX":{"origin":"MOW","destination":"MCX","price":43,"transfers":0,"airline":"UT","flight_number":559,"departure_at":"2020-05-04T01:40:00Z","return_at":"2020-05-14T06:10:00Z","expires_at":"2020-04-04T14:08:40Z"},"MRV":{"origin":"MOW","destination":"MRV","price":22,"transfers":0,"airline":"UT","flight_number":573,"departure_at":"2020-05-06T01:55:00Z","return_at":"2020-05-13T05:05:00Z","expires_at":"2020-04-05T18:23:27Z"},"NYC":{"origin":"MOW","destination":"NYC","price":128,"transfers":2,"airline":"TP","flight_number":1201,"departure_at":"2020-07-01T08:00:00Z","return_at":"2020-07-28T23:55:00Z","expires_at":"2020-04-05T17:54:41Z"},"SIP":{"origin":"MOW","destination":"SIP","price":51,"transfers":1,"airline":"UT","flight_number":535,"departure_at":"2020-04-25T01:50:00Z","return_at":"2020-05-02T11:30:00Z","expires_at":"2020-04-05T19:09:56Z"}},"error":null,"currency":"usd"}

# response.read_body["data"].to_h.map do |destination, info|
#     modified_info = flights_convert_param_keys(info)
#     Flight.create(modified_info)
# end

def hotels_convert_param_keys(params)

    modified_params = {
        t.float "lat"
        t.float "long"
        t.string "address"
        t.string "company"
        t.float "price"
    }

    return modified_params
end
# Hotelbeds API Endpoint - hotels
apitude_hotels_url = ''


# Amadeus API Endpoint - hotels
amadeus_url = ''

# Hotelbeds API Endpoint - activities
apitude_activities_url = ''

# Yelp API Endpoint - activities
yelp_url = ''





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