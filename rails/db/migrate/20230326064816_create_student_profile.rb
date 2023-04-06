class CreateStudentProfileTable < ActiveRecord::Migration[6.1]
  def change
    create_table :student_profile do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :gender, null: false
      t.integer :grade, null: false
      t.integer :age
      t.json :subjects
      t.string :school
      t.text :one_liner
      t.text :introduction

      t.timestamps
    end
  end
end
