class TeacherProfile < ApplicationRecord
    self.table_name = 'teacher_profile'
    belongs_to :user
    enum gender:{ "男性": 0, "女性": 1}
    enum major: { "理系": 0, "文系": 1 }
    enum style: { "オンライン": 0, "対面": 1 }

end
