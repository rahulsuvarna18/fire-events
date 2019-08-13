class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :link
      t.references :user

      t.timestamps
    end
  end
end
