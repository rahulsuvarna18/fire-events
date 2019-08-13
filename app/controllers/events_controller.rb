class EventsController < ApplicationController
  def stubhub_get
    require 'net/http'
    require 'json'
    begin
        uri = URI('https://api.stubhub.com/sellers/search/events/v3?city=london')
        http = Net::HTTP.new(uri.host, uri.port)
        req = Net::HTTP::Post.new(uri.path, {'Content-Type' =>'application/json',
          'Authorization' => 'Bearer NmWpqVwKS2OfJb4PDZY1N0jvI369'})
        res = http.request(req)
        puts "response #{res.body}"
        puts JSON.parse(res.body)
    rescue => e
        puts "failed #{e}"
    end
  end
end
