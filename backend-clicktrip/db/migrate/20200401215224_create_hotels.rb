class CreateHotels < ActiveRecord::Migration[6.0]
  def change
    create_table :hotels do |t|
      t.integer :trip_id
      t.float :lat
      t.float :long
      t.string :address
      t.string :company
      t.float :price
      t.date :checkin
      t.date :checkout

      t.timestamps
    end
  end
end
