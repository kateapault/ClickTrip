class CreateTrips < ActiveRecord::Migration[6.0]
  def change
    create_table :trips do |t|
      t.integer :user_id
      t.integer :num_people
      t.date :start_date
      t.date :end_date
      t.string :origin_city_name
      t.string :origin_city_iata
      t.string :destination_city_name
      t.string :destination_city_iata
      t.integer :budget

      t.timestamps
    end
  end
end
