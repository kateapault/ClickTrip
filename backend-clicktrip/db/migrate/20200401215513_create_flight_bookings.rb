class CreateFlightBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :flight_bookings do |t|
      t.integer :trip_id
      t.integer :flight_id
      t.integer :num_people
      t.float :price

      t.timestamps
    end
  end
end
