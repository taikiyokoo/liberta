class CreateLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :likes do |t|
      t.references :liker, null: false, foreign_key: { to_table: :users }
      t.references :liked, null: false, foreign_key: { to_table: :users }
      t.timestamps
    end
  end
end
