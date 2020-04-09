class Trip < ApplicationRecord
    has_many :flights
    has_many :hotels
    has_many :activities

    belongs_to :user
end
