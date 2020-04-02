Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  resources :users
  resources :trips
  resources :flights
  resources :flight_bookings
  resources :hotels
  resources :hotel_bookings
  resources :activities
  resources :activity_bookings
  resources :sessions, only: [:new, :create, :destroy]

end
