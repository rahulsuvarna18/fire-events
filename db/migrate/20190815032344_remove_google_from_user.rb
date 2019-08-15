class RemoveGoogleFromUser < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :google_token
    remove_column :users, :google_refresh_token
  end
end
