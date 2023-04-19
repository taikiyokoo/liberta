class AddDesiredSchoolAndMajorAndStyleAndDurationAndFrequencyAndScoreToStudentProfile < ActiveRecord::Migration[6.1]
  def change
    add_column :student_profile, :desired_school, :string
    add_column :student_profile, :major, :integer
    add_column :student_profile, :style, :integer
    add_column :student_profile, :duration, :integer
    add_column :student_profile, :frequency, :integer
    add_column :student_profile, :score, :integer
  end
end
