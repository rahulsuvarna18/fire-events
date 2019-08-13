class Event < ApplicationRecord
  has_many :photos
  validates :start_time, :start_date, :end_time, :end_date, presense: true
  validates :price, :location, :lng, :lat, presence: true
end
