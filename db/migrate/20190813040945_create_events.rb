class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :name
      t.string :location
      t.date :start_date
      t.time :start_time
      t.date :end_date
      t.time :end_time
      t.integer :price
      t.string :url
      t.float :lat
      t.float :lng

      t.timestamps
    end
  end
end
