# frozen_string_literal: true

class User < ActiveRecord::Base
  self.table_name = 'users'
  has_one :student_profile,dependent: :destroy
  has_one :teacher_profile,dependent: :destroy

  #自分がしたいいね 
  has_many :likes_given,foreign_key: "liker_id",class_name: "Like"
  #自分がいいねしたユーザー
  has_many :liked_users,through: :likes_given,source: :liked

  #自分がもらったいいね
  has_many :likes_received, foreign_key: "liked_id", class_name: "Like"

  #自分がいいねをもらったユーザー
  has_many :liking_users, through: :likes_received, source: :liker

  enum user_type: { teacher: 0, student: 1 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  def liked?(user_id)
    likes_given.where(liked_id: user_id).exists?
  end



end
