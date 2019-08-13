class CreatePhotos < ActiveRecord::Migration[5.2]
  def change
    create_table :photos do |t|
      t.string :link
      t.user :references

      t.timestamps
    end
  end
end
