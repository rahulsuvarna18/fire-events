class Event < ApplicationRecord
  validates :start_date, :start_time, :end_date, :end_time, presence: true
  geocoded_by :location
  after_validation :geocode, if: :will_save_change_to_location?
end
