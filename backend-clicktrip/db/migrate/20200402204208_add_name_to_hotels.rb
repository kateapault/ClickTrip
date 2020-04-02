class AddNameToHotels < ActiveRecord::Migration[6.0]
  def change
    add_column :hotels, :name, :string
  end
end
