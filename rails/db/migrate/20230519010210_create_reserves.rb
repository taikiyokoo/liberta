class CreateReserves < ActiveRecord::Migration[6.1]
  def change
    create_table :reserves do |t|
      t.integer :teacher_id
      t.integer :student_id
      t.datetime :start_time
      t.datetime :end_time
      t.integer :fee
      t.integer :status

      t.timestamps
    end
  end
end
