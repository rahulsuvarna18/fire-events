  require 'httparty'
  require 'json'

    url = 'https://api.stubhub.com/sellers/search/events/v3?date=2019-08-15%20TO%202019-09-15&city=london&rows=100'
    headers = {
      Accept: "application/json",
      Authorization: "Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369"
    }

    response = HTTParty.get(url, headers: headers)
    response["events"].each do |event|
      p event["name"], event["venue"]["city"], event["eventDateLocal"]
    end
