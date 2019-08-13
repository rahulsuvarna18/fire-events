class Event < ApplicationRecord
  validates :start_date, :start_time, :end_date, :end_time, presence: true
end
