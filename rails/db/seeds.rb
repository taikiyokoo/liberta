# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



student_school_examples = [  "青山学院中等部・高等部",  "筑波大学附属駒場中・高等学校",  "早稲田大学高等学院",  "東京都立日比谷高等学校",  "慶應義塾普通部・高等部",  "東京都立国立高等学校",  "国際基督教大学中等部・高等部",  "関西学院高等部",  "京都市立洛北高等学校",  "北海道札幌東高等学校",  "宮城県仙台第一高等学校",  "福岡県立修猷館高等学校",  "長野県松本深志高等学校",  "新潟県立新潟高等学校",  "広島県立広島皆実高等学校",  "愛知県立瑞陵高等学校",  "岐阜県立岐阜高等学校",  "群馬県立高崎高等学校",  "栃木県立小山高等学校",  "埼玉県立所沢北高等学校",  "神奈川県立湘南高等学校",  "山梨県立甲府第一高等学校",  "大阪府立北野高等学校",  "京都府立洛陽高等学校",  "奈良県立奈良高等学校",  "和歌山県立桐蔭学園高等学校",  "徳島県立城南高等学校",  "高知県立高知中央高等学校",  "鹿児島県立鶴丸高等学校",  "沖縄県立首里高等学校"]

users = User.all
users.each do |user|
  if user.student_profile
    user.student_profile.update(school: student_school_examples.sample)
  end
end