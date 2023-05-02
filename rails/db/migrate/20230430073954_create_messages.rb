class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.integer :user_id, null: false, foreign_key: true
      t.integer :chatroom_id, null: false, foreign_key: true
      t.text :content, null: false

      t.timestamps
    end

    add_index :messages, :user_id
    add_index :messages, :chatroom_id
  end
end
