class CreateHotelBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :hotel_bookings do |t|
      t.integer :trip_id
      t.integer :hotel_id
      t.integer :num_people
      t.float :price
      t.date :check_in
      t.date :check_out

      t.timestamps
    end
  end
end
