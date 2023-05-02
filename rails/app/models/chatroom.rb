class Chatroom < ApplicationRecord
    # チャットルームに関連するユーザーを取得する
    belongs_to :user1, class_name: 'User', foreign_key: 'user1_id'
    belongs_to :user2, class_name: 'User', foreign_key: 'user2_id'

    # チャットルームに関連するメッセージを取得する
    has_many :messages, dependent: :destroy


    def self.find_existing_room(user1_id, user2_id)
        where(
          user1_id: [user1_id, user2_id],
          user2_id: [user1_id, user2_id]
        ).first
    end
end
