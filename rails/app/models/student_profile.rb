class StudentProfile < ActiveRecord::Base
    self.table_name = 'student_profile'
    belongs_to :user

    validates :user_id, presence: true

    enum gender:{ male: 0, female: 1}
    enum major: { "理系": 0, "文系": 1 }
    enum style: { "オンライン": 0, "対面": 1 }
    enum duration: {"テスト期間のみ": 0, "1日": 1, "１週間": 2, "１ヶ月": 3,"１〜３ヶ月": 4,"３〜６ヶ月": 5,"１年以上": 6}
    enum frequency: {"週１回": 0, "週２回": 1, "週３回": 2, "週４回": 3,"週５回": 4,"週６回": 5,"週７回": 6}
    enum grade: {"中学１年生": 0, "中学２年生": 1, "中学３年生": 2, "高校１年生": 3,"高校２年生": 4,"高校３年生": 5}
end