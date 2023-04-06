class CreateTeacherProfiles < ActiveRecord::Migration[6.1]
  def change
    create_table :teacher_profiles do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :age, null: false
      t.integer :gender, null: false
      t.string :university
      t.json :subjects
      t.text :introduction
      t.text :one_liner
      t.integer :hourly_pay

      t.timestamps
    end
  end
end
