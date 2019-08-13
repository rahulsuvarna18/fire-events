class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :favourites
  has_many :events, through: :favourites
  validates :first_name, :last_name, :email, :password, :avatar, presence: true
  validates :email, uniqueness: true
  mount_uploader :avatar, PhotoUploader
end

