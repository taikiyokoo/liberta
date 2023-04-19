class RenameMajorColumnTomajorInTeacherProfile < ActiveRecord::Migration[6.1]
  def change
    rename_column :teacher_profile, :Major, :major
  end
end
