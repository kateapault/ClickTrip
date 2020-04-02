class Trip < ApplicationRecord
    has_many :flight_bookings
    has_many :hotel_bookings
    has_many :activity_bookings

    belongs_to :user
end
