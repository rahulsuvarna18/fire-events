class EventsController < ApplicationController

  def index
    @events = Event.geocoded #returns events with coordinates

    @markers = @events.map do |event|
      {
        lat: event.latitude,
        lng: event.longitude
      }
    end

    def show
      @event = Event.find(params[:id])
    end
  end
end
