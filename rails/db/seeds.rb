# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

gender = ["male","female"]
grade = ["中学１年生", "中学２年生", "中学３年生", "高校１年生","高校２年生","高校３年生"]
major = ["理系", "文系"]
style = ["オンライン", "対面"]
duration = ["テスト期間", "1日", "１週間", "１ヶ月","１〜３ヶ月","３〜６ヶ月","１年以上"]
frequency = ["週１回", "週２回", "週３回", "週４回","週５回","週６回","週７回"]


users = User.all

users.each do |user|
  if user.student_profile
    user.student_profile.update(
        grade: grade.sample
      )
  end
end