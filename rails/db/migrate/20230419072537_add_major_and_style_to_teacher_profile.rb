class AddMajorAndStyleToTeacherProfile < ActiveRecord::Migration[6.1]
  def change
    add_column :teacher_profile, :Major, :integer
    add_column :teacher_profile, :style, :integer
  end
end
