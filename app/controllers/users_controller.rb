class UsersController < ApplicationController

  def dashboard
    @user = current_user
    favourites = @user.favourites
    @events = []
    favourites.each do |fav|
      @events << fav.event
    end

    @markers = @events.map do |event|
      {
        lat: event.latitude,
        lng: event.longitude,
        infoWindow: render_to_string(partial: "info_window", locals: { event: event })
      }
    end
    @event = Event.new
  end
end
