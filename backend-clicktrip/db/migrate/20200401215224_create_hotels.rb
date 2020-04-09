class CreateHotels < ActiveRecord::Migration[6.0]
  def change
    create_table :hotels do |t|
      t.integer :trip_id
      t.string :name
      t.float :lat
      t.float :long
      t.string :address
      t.string :company
      t.float :price_per_night
      t.date :checkin
      t.date :checkout

      t.timestamps
    end
  end
end
