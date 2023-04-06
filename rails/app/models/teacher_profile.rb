class TeacherProfile < ApplicationRecord
    self.table_name = 'teacher_profile'
    belongs_to :user
    enum gender:{ male: 0, female: 1}
end
