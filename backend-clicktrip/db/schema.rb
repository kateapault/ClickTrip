# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_01_215625) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.float "lat"
    t.float "long"
    t.string "city"
    t.string "name"
    t.string "type"
    t.time "open_time"
    t.time "close_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "activity_bookings", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "activity_id"
    t.integer "num_people"
    t.date "date"
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flight_bookings", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "flight_id"
    t.integer "num_people"
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flights", force: :cascade do |t|
    t.string "departure_airport"
    t.time "departure_time"
    t.date "departure_date"
    t.string "arrival_airport"
    t.time "arrival_time"
    t.date "arrival_date"
    t.string "airline"
    t.string "flight_num"
    t.integer "num_stops"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hotel_bookings", force: :cascade do |t|
    t.integer "trip_id"
    t.integer "hotel_id"
    t.integer "num_people"
    t.float "price"
    t.date "check_in"
    t.date "check_out"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "hotels", force: :cascade do |t|
    t.float "lat"
    t.float "long"
    t.string "address"
    t.string "company"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "trips", force: :cascade do |t|
    t.integer "user_id"
    t.integer "num_people"
    t.date "start_date"
    t.date "end_date"
    t.string "origin_city_name"
    t.string "origin_city_iata"
    t.string "destination_city_name"
    t.string "destination_city_iata"
    t.integer "budget"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "firstname"
    t.string "lastname"
    t.string "email"
    t.string "home_town"
    t.string "home_iata"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
