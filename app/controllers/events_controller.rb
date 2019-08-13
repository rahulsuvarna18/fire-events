class EventsController < ApplicationController
  def getstubhubevents(location)
    url = "https://api.stubhub.com/sellers/search/events/v3?city=#{location}&rows=10"
    # url = "https://api.stubhub.com/sellers/search/events/v3?date=#{start_date}TO#{end_date}&city=#{location}&rows=100"
    headers = {
      Accept: "application/json",
      Authorization: "Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369"
    }
    response = HTTParty.get(url, headers: headers)
    response["events"].each do |event|
      Event.create!(name: event["name"], location: event["venue"]["city"], start_date: event["eventDateLocal"],
      price: event["ticketInfo"]["minListPrice"], url: ("https://stubhub.com" + event["webURI"]))
    end
  end

      
 def index
    @events = params[:location] ? search : Event.geocoded #returns events with coordinates

    @markers = @events.map do |event|
      {
        lat: event.latitude,
        lng: event.longitude
      }
  end

  def show
      @event = Event.find(params[:id])
  end
   
   def search
    Event.where("name ILIKE '%#{params[:location]}%'")
   end
end
