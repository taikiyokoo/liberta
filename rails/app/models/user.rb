# frozen_string_literal: true

class User < ActiveRecord::Base
  self.table_name = 'users'
  has_one :student_profile,dependent: :destroy
  has_one :teacher_profile,dependent: :destroy

  enum user_type: { teacher: 0, student: 1 }

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User



end
