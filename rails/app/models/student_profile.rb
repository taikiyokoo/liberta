class StudentProfile < ActiveRecord::Base
    self.table_name = 'student_profile'
    belongs_to :user
    enum gender:{ male: 0, female: 1}


end