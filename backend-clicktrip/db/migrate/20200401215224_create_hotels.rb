class CreateHotels < ActiveRecord::Migration[6.0]
  def change
    create_table :hotels do |t|
      t.float :lat
      t.float :long
      t.string :address
      t.string :company
      t.float :price

      t.timestamps
    end
  end
end
