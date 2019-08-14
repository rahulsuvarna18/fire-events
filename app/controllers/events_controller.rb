require 'open-uri'
require 'json'
require 'net/http'
require 'httparty'

class EventsController < ApplicationController
  def parse_eventbrite(location)
    @events = []
    url = "https://www.eventbriteapi.com/v3/events/search?location.address=#{location}&location.within=5km&expand=venue&token=JVGRXXNSW3CLWBYKG7RQ"
    # url = "https://www.eventbriteapi.com/v3/events/search/?q=#{name}&location.address=#{address}&categories=111&price=#{price}&start_date.range_start=2019-10-19T15%3A30%3A00&start_date.range_end=2019-11-19T15%3A30%3A00&token=JVGRXXNSW3CLWBYKG7RQ"
    html_file = open(url).read
    html_doc = JSON.parse(html_file)
    html_doc["events"].each do |event|
      if event["venue"]["city"] =! nil
        @events << Event.new(name: event["name"]["text"], latitude: event["venue"]["latitude"], longitude: event["venue"]["longitude"], start_date: event["start"]["local"], end_date: event["end"]["local"], url: event["url"], category: find_eventbrite_category_name(event["category_id"].to_i))
      end
    end
    @events
  end

  def geteventfulevents(location)
    url = "http://api.eventful.com/json/events/search?&location=#{location}&date=Future&app_key=f672q2vdWWFJVGmq"
    response = HTTParty.get(url)
    x = JSON.parse(response)
     x["events"]["event"].each do |event|
      @events << Event.new(name: event["title"], latitude: event["latitude"], longitude: event["longitude"], start_date: event["start_time"], end_date: event["stop_time"], url: event["url"])
    end
    @events
  end

  def index
    @events = parse_eventbrite(params[:location]) + geteventfulevents(params[:location])
      @markers = @events.map do |event|
        {
          lat: event.latitude,
          lng: event.longitude
        }
      end
  end

  def show
    @event = Event.find(params[:id])
  end

  private

  def find_eventbrite_category_name(category_id)
    @categories = [
      {id: 101, name: "Business"},
      {id: 102, name: "Science & Tech"},
      {id: 103, name: "Music"},
      {id: 104, name: "Film & Media"},
      {id: 105, name: "Arts"},
      {id: 106, name: "Fashion"},
      {id: 107, name: "Health"},
      {id: 108, name: "Sports & Fitness"},
      {id: 109, name: "Travel & Outdoor"},
      {id: 110, name: "Food & Drink"},
      {id: 111, name: "Charity & Causes"},
      {id: 112, name: "Government"},
      {id: 113, name: "Community"},
      {id: 114, name: "Spirituality"},
      {id: 115, name: "Family & Education"},
      {id: 116, name: "Holiday"},
      {id: 117, name: "Home & Lifestyle"},
      {id: 118, name: "Auto, Boat & Air"},
      {id: 119, name: "Hobbies"},
      {id: 120, name: "School Activities"},
      {id: 121, name: "Other"}
    ]

    @categories.each do |category|
      if category[:id] == category_id
        @cat_name = category[:name]
      end
    end
    return @cat_name
  end
end
