class Photo < ApplicationRecord
  belongs_to :events
  validates :event_id, :link, presence: true
end
