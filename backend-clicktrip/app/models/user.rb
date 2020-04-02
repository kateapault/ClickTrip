class User < ApplicationRecord
    has_secure_password

    has_many :trips

    has_many :flight_bookings, through: :trips
    has_many :hotel_bookings, through: :trips
    has_many :activity_bookings, through: :trips
end
