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

  post '/search-dummy-flights', to: 'flights#dummysearch'
  post '/search-dummy-hotels', to: 'hotels#dummysearch'
  post '/search-dummy-activities', to: 'activities#dummysearch'

  post '/search-flights-price', to: 'flights#searchprice'
  post '/search-flights-dest', to: 'flights#searchdest'
  get '/flight-results', to: 'flights#results'
  get '/users/:user_id/trips', to: 'users#my_trips'

end
