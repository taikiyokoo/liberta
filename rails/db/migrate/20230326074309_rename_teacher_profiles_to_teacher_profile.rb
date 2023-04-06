class RenameTeacherProfilesToTeacherProfile < ActiveRecord::Migration[6.1]
  def change
    rename_table :teacher_profiles, :teacher_profile
  end
end
