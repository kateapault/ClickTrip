class FlightBooking < ApplicationRecord
    belongs_to :trip
    belongs_to :flight
end
