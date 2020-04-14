class AddDurationToTrips < ActiveRecord::Migration[6.0]
  def change
    add_column :trips, :duration, :integer
  end
end
