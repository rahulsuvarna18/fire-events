require 'open-uri'
require 'json'
require 'net/http'
require 'httparty'

class EventsController < ApplicationController
  def parse_eventbrite(location, categories = nil, start_date = nil, end_date = nil)
    @events = []
    if start_date.present? && end_date.present?
      url = "https://www.eventbriteapi.com/v3/events/search?location.address=#{location}&location.within=50km&categories=#{categories}&start_date.range_start=#{start_date+"T00:00:00"}&start_date.range_end=#{end_date+"T00:00:00"}&expand=venue&token=JVGRXXNSW3CLWBYKG7RQ"
    else
      url = "https://www.eventbriteapi.com/v3/events/search?location.address=#{location}&location.within=50km&categories=#{categories}&expand=venue&token=JVGRXXNSW3CLWBYKG7RQ"
    end
    html_file = open(url).read
    html_doc = JSON.parse(html_file)
    html_doc["events"].each do |event|
      if event["venue"]["city"] =! nil
        photo = event["logo"]["original"]["url"] if event["logo"].present?
        @events << Event.new(name: event["name"]["text"], description: event["description"]["text"], latitude: event["venue"]["latitude"], longitude: event["venue"]["longitude"], start_date: event["start"]["local"], end_date: event["end"]["local"], url: event["url"], category: find_eventbrite_category_name(event["category_id"].to_i), photo: photo)
      end
    end
    @events
  end

  def geteventfulevents(location, categories = nil, start_date = nil, end_date = nil)
    if start_date.present? && end_date.present?
      url = "http://api.eventful.com/json/events/search?q=#{find_eventbrite_category_name(categories)}&location=#{location}&date=#{start_date+"00-"+end_date+"00"}&app_key=f672q2vdWWFJVGmq"
    else
      url = "http://api.eventful.com/json/events/search?q=#{find_eventbrite_category_name(categories)}&location=#{location}&date=Future&app_key=f672q2vdWWFJVGmq"
    end
    response = HTTParty.get(url)
    x = JSON.parse(response)
    @category_count = x["total_items"].to_i
     x["events"]["event"].each do |event|
      photo = event["image"]["url"] if event["image"].present?
      @events << Event.new(name: event["title"], description: event["description"], latitude: event["latitude"], longitude: event["longitude"], start_date: event["start_time"], end_date: event["stop_time"], url: event["url"], photo: photo)
    end
    @events
  end

  def index
    @events = parse_using_params.uniq{|x| x.name}

      @markers = @events.map do |event|
        {
          lat: event.latitude,
          lng: event.longitude
        }
      end
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    @event.description = @event.description.gsub(/\n+/, '').gsub(/\r+/, '')
    @event.save
    @favourite = Favourite.new(event_name: @event.name, event_id: @event.id, user: current_user)
    @favourite.save
    respond_to do |format|
      format.html { redirect_to events_path }
      format.js
    end
  end

  def show
    @event = Event.find(params[:id])
  end

  private

  def event_params
    params.require(:event).permit(:name, :location, :start_date, :end_date, :start_time, :end_time, :price, :url, :photo, :category, :description)
  end

  def parse_using_params
    if params[:location].present? && params[:categories].present? && params[:start_date].present? && params[:end_date].present?
      @events = parse_eventbrite(params[:location], params[:categories], params[:start_date], params[:end_date]) + geteventfulevents(params[:location], params[:categories], params[:start_date], params[:end_date])
    elsif params[:location].present? && params[:categories].present?
      @events = parse_eventbrite(params[:location], params[:categories]) + geteventfulevents(params[:location], params[:categories])
    elsif params[:location].present?
      @events = parse_eventbrite(params[:location]) + geteventfulevents(params[:location])
    else
      params[:location] = "london"
      @events = parse_eventbrite(params[:location]) + geteventfulevents(params[:location])
    end
    return @events
  end

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
