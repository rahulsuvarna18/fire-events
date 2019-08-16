# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Event.create!(name: "Jacks house party", location: "Surrey", start_date: Date.new, end_date: Date.new + 100, start_time: Time.now, end_time: Time.now + 10, url: "https://www.songkick.com/developer", latitude: 49.1913, longitude: 122.8490)
require 'faker'

10.times do
  Event.new(
    name: Faker::Restaurant.name,
    location: Faker::Address.city,
    start_date: Date.today + rand(30..50),
    start_time: Time.now,
    end_date: Date.today + rand(60..100),
    end_time: Time.now,
    price: 20,
    category: Faker::Beer.brand
    ).save
end

10.times do
  Favourite.new(
event_id: Event.all.sample.id,
user_id: 2
    ).save
end
