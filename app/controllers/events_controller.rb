require 'open-uri'
require 'json'
require 'net/http'

class EventsController < ApplicationController
  def stubhub_get
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
