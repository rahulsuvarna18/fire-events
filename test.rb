  require 'httparty'
  require 'json'

    url = 'https://api.stubhub.com/sellers/search/events/v3?city=london&rows=100'
    headers = {
      Accept: "application/json",
      Authorization: "Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369"
    }

    response = HTTParty.get(url, headers: headers)
    response["events"].each do |event|
      p event["name"], event["venue"]["city"], event["eventDateLocal"]
    end
