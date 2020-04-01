class CreateActivityBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :activity_bookings do |t|
      t.integer :trip_id
      t.integer :activity_id
      t.integer :num_people
      t.date :date
      t.float :price

      t.timestamps
    end
  end
end
