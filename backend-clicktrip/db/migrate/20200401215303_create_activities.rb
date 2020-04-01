class CreateActivities < ActiveRecord::Migration[6.0]
  def change
    create_table :activities do |t|
      t.float :lat
      t.float :long
      t.string :city
      t.string :name
      t.string :type
      t.time :open_time
      t.time :close_time

      t.timestamps
    end
  end
end
