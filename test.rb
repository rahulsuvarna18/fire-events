  require 'httparty'
  require 'json'

    url = 'http://api.eventful.com/json/events/search?&location=San+Diego&date=Future&app_key=f672q2vdWWFJVGmq'

    response = HTTParty.get(url)
    x = JSON.parse(response)
     x["events"]["event"].each do |event|
      p event["title"]
      p event["latitude"]
      p event["longitude"]
      p event["start_time"]
      p event["stop_time"]
    end

