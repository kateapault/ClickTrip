class HotelsController < ApplicationController

    def index
        @hotels = Hotel.all
        render json: @hotels
    end

    def create
    end
end