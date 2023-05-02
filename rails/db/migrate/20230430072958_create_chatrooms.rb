class CreateChatrooms < ActiveRecord::Migration[6.1]
  def change
    create_table :chatrooms do |t|
      t.integer :user1_id, null: false
      t.integer :user2_id, null: false

      t.timestamps
    end
  end
end
