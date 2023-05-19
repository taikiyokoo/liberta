class Message < ApplicationRecord
    belongs_to :user
    belongs_to :chatroom

    validates :content, presence: true
    validates :user_id, presence: true
    validates :chatroom_id, presence: true
    
end
