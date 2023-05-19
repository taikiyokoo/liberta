# frozen_string_literal: true

class User < ActiveRecord::Base
  self.table_name = 'users'
  has_one :student_profile,dependent: :destroy
  has_one :teacher_profile,dependent: :destroy

  #自分がしたいいね 
  has_many :likes_given,foreign_key: "liker_id",class_name: "Like"
  #自分がいいねをしたユーザー
  has_many :liked_users,through: :likes_given,source: :liked

  #自分がもらったいいね
  has_many :likes_received, foreign_key: "liked_id", class_name: "Like"

  #自分がいいねをもらったユーザー
  has_many :liking_users, through: :likes_received, source: :liker

  #チャットルーム関連付け
  has_many :chatrooms_as_user1, class_name: 'Chatroom', foreign_key: 'user1_id', dependent: :destroy
  has_many :chatrooms_as_user2, class_name: 'Chatroom', foreign_key: 'user2_id', dependent: :destroy

  #メッセージ関連付け
  has_many :messages, dependent: :destroy

  enum user_type: { teacher: 0, student: 1 }

  #予約関連付け
  has_many :reserves_as_teacher, class_name: 'Reserve', foreign_key: 'teacher_id', dependent: :destroy
  has_many :reserves_as_student, class_name: 'Reserve', foreign_key: 'student_id', dependent: :destroy

  #validate
  validates :email, presence: true, uniqueness: true
  validates :user_type, presence: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create
  validates :password_confirmation, presence: true, on: :create
  validates :name, presence: true, length: { maximum: 20 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  def liked?(user_id)
    likes_given.where(liked_id: user_id).exists?
  end

  def self.teacher_search(params)
    users = User.where(user_type: :teacher).joins(:teacher_profile)
    teacher_profile_table = TeacherProfile.arel_table
  
    search_params = {
      university: params[:university],
      gender: params[:gender],
      major: params[:major],
      style: params[:style],
      hourly_pay: params[:hourly_pay]
    }
  
    search_params.each do |key, value|
      next if value.blank?
  
      if key == :university
        users = users.where(teacher_profile_table[key].matches("%#{value}%"))
      elsif key == :hourly_pay
        min = value[0]
        max = value[1]
        users = users.where(teacher_profile_table[key].gteq(min)).where(teacher_profile_table[key].lteq(max))
      else
        users = users.where(teacher_profile_table[key].eq(value))
      end
    end
  
    users
  end
  

  def self.student_search(params)
    users = User.where(user_type: :student).joins(:student_profile)
    student_profile_table = StudentProfile.arel_table
  
    search_params = {
      grade: params[:grade],
      desired_school: params[:desired_school],
      major: params[:major],
      style: params[:style],
      duration: params[:duration],
      frequency: params[:frequency]
    }
  
    search_params.each do |key, value|
      next if value.blank?
  
      if key == :desired_school
        users = users.where(student_profile_table[key].matches("%#{value}%"))
      else
        users = users.where(student_profile_table[key].eq(value))
      end
    end
  
    return users
  end

  # ユーザーが関連するチャットルームを取得する
  def chatrooms
    Chatroom.where('user1_id = ? OR user2_id = ?', self.id, self.id)
  end

  #生徒がその先生に予約を入れているかどうか
  def requested?(teacher_id)
    reserves_as_student.where(teacher_id: teacher_id,status: 0).exists?
  end

  
end
