class RemoveCoordinatesFromEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :lat, :string
    remove_column :events, :lng, :string
  end
end
