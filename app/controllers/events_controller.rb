require 'open-uri'
require 'json'
require 'net/http'

class EventsController < ApplicationController

  def parsing_eventbrite

    categories = {
    "Business" => 101,
    "Science & Tech" => 102,
    "Music" => 103,
    "Film & Media" => 104,
    "Arts" => 105,
    "Fashion" => 106,
    "Health" => 107,
    "Sports & Fitness" => 108,
    "Travel & Outdoor" => 109,
    "Food & Drink" => 110,
    "Charity & Causes" => 111,
    "Government" => 112,
    "Community" => 113,
    "Spirituality" => 114,
    "Family & Education" => 115,
    "Holiday" => 116,
    "Home & Lifestyle" => 117,
    "Auto, Boat & Air" => 118,
    "Hobbies" => 119,
    "School Activities" => 120,
    "Other" => 121,
    }

    puts "Which name"
    name = gets.chomp
    puts "Which address"
    address = gets.chomp
    puts "Which start date"
    star_date = gets.chomp
    puts "Which end date"
    end_date = gets.chomp
    puts "Which category"
    category = categories[gets.chomp]
    puts "Which price"
    price = gets.chomp

    url = "https://www.eventbriteapi.com/v3/events/search/?q=#{name}&location.address=#{address}&categories=111&price=#{price}&start_date.range_start=2019-10-19T15%3A30%3A00&start_date.range_end=2019-11-19T15%3A30%3A00&token=JVGRXXNSW3CLWBYKG7RQ"
    html_file = open(url).read
    html_doc = JSON.parse(html_file)
    html_doc["events"].each do |event|

      event["name"]["text"]
      event["name"]["text"]
      event["venue_id"]["text"]
      event["start"]["local"]
      event["end"]["local"]
      event["category_id"]["text"]


      event["summary"]["text"]
      event["description"]["text"]
    end
  end

    def getstubhubevents(location)
    url = "https://api.stubhub.com/sellers/search/events/v3?city=#{location}&rows=10"
    # url = "https://api.stubhub.com/sellers/search/events/v3?date=#{start_date}TO#{end_date}&city=#{location}&rows=100"
    headers = {
      Accept: "application/json",
      Authorization: "Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369"
    }
    response = HTTParty.get(url, headers: headers)

    # Event.destroy_all

    # response["events"].each do |event|
    #   Event.create!(name: event["name"], location: event["venue"]["city"], start_date: event["eventDateLocal"],
    #   price: event["ticketInfo"]["minListPrice"], url: ("https://stubhub.com" + event["webURI"]))
    # end

    response["events"].each do |event|
      coordinates = Geocoder.search(event["venue"]["city"])
         @markers = {lat: coordinates.first, lng: coordinates.last}
    end
  end

  def geteventfulevents(location)
    url = "http://api.eventful.com/json/events/search?&location=#{location}&date=Future&app_key=f672q2vdWWFJVGmq"
    response = HTTParty.get(url)
    x = JSON.parse(response)
     x["events"]["event"].each do |event|
      p event["title"]
      p event["latitude"]
      p event["longitude"]
      p event["start_time"]
      p event["stop_time"]
  end


 def index
  getstubhubevents(params[:location])
    @events = params[:location] ? search : Event.geocoded #returns events with coordinates

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

  def search
    Event.where("name ILIKE '%#{params[:location]}%'")
  end
end
