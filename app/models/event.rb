class Event < ApplicationRecord
  validates :name, :location, :start_date, presence: true
end
