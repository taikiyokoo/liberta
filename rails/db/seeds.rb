# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

count = 5
subjects = ["英語", "数学", "国語", "物理", "化学"]
university =["東京大学","京都大学","大阪大学","東北大学","九州大学","名古屋大学"]
gender = ["male", "female"]

100.times do
    count+=1
    user = User.create!(
      name: "user#{count}",
      email: "user#{count}@gmail.com",
      password: 'password',
      password_confirmation: 'password',
      user_type: count%2==0 ? "teacher" : "student"
    )
    if user.user_type == "teacher"
        TeacherProfile.create!(
            user_id: user.id,
            age: rand(20..50),
            gender: gender.sample,
            university: university.sample,
            subjects: subjects.sample(rand(1..3)),
            introduction: "introduction#{count}",
        )
    elsif user.user_type == "student"
        StudentProfile.create!(
            user_id: user.id,
            age: rand(10..20),
            gender: gender.sample,
            grade: rand(1..6),
            subjects: subjects.sample(rand(1..3)),
            introduction: "introduction#{count}",
            school: "school#{count}"
        )
    else
        puts "error"
    end
end