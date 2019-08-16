class FavouritesController < ApplicationController
  def create
    @favourite = Favourite.new
    @favoutite.save
  end

  def delete
    @favourite = Favourite.find(params[:id])
    @favourite.destroy
  end
end
