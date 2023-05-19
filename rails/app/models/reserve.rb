class Reserve < ApplicationRecord
#validation
    validates :teacher_id, presence: true
    validates :student_id, presence: true
    validates :start_time, presence: true
    validates :end_time, presence: true
    validates :fee, presence: true
    validates :status, presence: true
    
#enum
    enum status: { pending: 0, approved: 1, rejected: 2, canceled: 3, completed: 4 }
#ユーザーとの関連付け
    belongs_to :teacher, class_name: 'User', foreign_key: 'teacher_id'
    belongs_to :student, class_name: 'User', foreign_key: 'student_id'
end
