class CreateFlights < ActiveRecord::Migration[6.0]
  def change
    create_table :flights do |t|
      t.integer :trip_id
      t.string :departure_airport
      t.time :departure_time
      t.date :departure_date
      t.string :arrival_airport
      t.time :arrival_time
      t.date :arrival_date
      t.string :airline
      t.string :flight_num
      t.integer :num_stops
      t.float :price

      t.timestamps
    end
  end
end
