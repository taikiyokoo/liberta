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

  enum user_type: { teacher: 0, student: 1 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  def liked?(user_id)
    likes_given.where(liked_id: user_id).exists?
  end

  def self.teacher_search(params)
    users = User.where(user_type: :teacher)
    teacher_profile_table = TeacherProfile.arel_table

    if params[:university].present?
      users = users.joins(:teacher_profile).where(teacher_profile_table[:university].matches("%#{params[:university]}%"))
    end
    if params[:gender].present?
      users = users.joins(:teacher_profile).where(teacher_profile_table[:gender].eq(params[:gender]))
    end
    if params[:major].present?
      users = users.joins(:teacher_profile).where(teacher_profile_table[:major].eq(params[:major]))
    end
    if params[:style].present?
      users = users.joins(:teacher_profile).where(teacher_profile_table[:style].eq(params[:style]))
    end
    if params[:hourly_pay].present?
      min = params[:hourly_pay][0]
      max = params[:hourly_pay][1]
      users = users.joins(:teacher_profile).where(teacher_profile_table[:hourly_pay].gteq(min))
      users = users.joins(:teacher_profile).where(teacher_profile_table[:hourly_pay].lteq(max))
    end

    return users

  end

  def self.student_search(params)
    users = User.where(user_type: :student)
    student_profile_table = StudentProfile.arel_table
  
    if params[:grade].present?
      users = users.joins(:student_profile).where(student_profile_table[:grade].eq(params[:grade]))
    end
    if params[:desired_school].present?
      users = users.joins(:student_profile).where(student_profile_table[:desired_school].matches("%#{params[:desired_school]}%"))
    end
    if params[:major].present?
      users = users.joins(:student_profile).where(student_profile_table[:major].eq(params[:major]))
    end
    if params[:style].present?
      users = users.joins(:student_profile).where(student_profile_table[:style].eq(params[:style]))
    end
    if params[:duration].present?
      users = users.joins(:student_profile).where(student_profile_table[:duration].eq(params[:duration]))
    end
    if params[:frequency].present?
      users = users.joins(:student_profile).where(student_profile_table[:frequency].eq(params[:frequency]))
    end
  
    return users
  end

end
