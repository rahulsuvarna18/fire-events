class Event < ApplicationRecord
  validates :name, :location, :start_date, presence: true
  geocoded_by :location
  after_validation :geocode, if: :will_save_change_to_location?
end
