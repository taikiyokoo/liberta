class TeacherProfile < ApplicationRecord
    self.table_name = 'teacher_profile'
    belongs_to :user
    enum gender:{ male: 0, female: 1}
    enum major: { "理系": 0, "文系": 1 }
    enum style: { "オンライン": 0, "対面": 1 }

end
