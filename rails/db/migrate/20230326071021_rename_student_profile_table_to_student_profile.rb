class RenameStudentProfileTableToStudentProfile < ActiveRecord::Migration[6.1]
  def change
    rename_table :student_profile_tables, :student_profile
  end
end
