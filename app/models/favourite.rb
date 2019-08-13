class Favourite < ApplicationRecord
  belongs_to :event
  belongs_to :user
  validates :user_id, :event_id, presence: true

end
