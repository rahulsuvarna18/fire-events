class FavouritesController < ApplicationController
  def create
    @favourite = Favourite.new
    @user = User.find(params[:current_user])
    @favoutite.save
  end

  def destroy
    @favourite = Favourite.find(params[:id])
    @favourite.destroy
    respond_to do |format|
      format.html { redirect_to users_dashboard_path, notice: 'Your favourite was deleted' }
      format.js
    end
  end
end
