class EventsController < ApplicationController
  require 'httparty'
  require 'json'

  def getstubhubevents(location, start_date, end_date)
    url = "https://api.stubhub.com/sellers/search/events/v3?date=#{start_date}TO#{end_date}&city=#{location}&rows=100"
    headers = {
      Accept: "application/json",
      Authorization: "Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369"
    }
    response = HTTParty.get(url, headers: headers)
    response["events"].each do |event|
      p event["name"], event["venue"]["city"], event["eventDateLocal"]
    end
  end
end
