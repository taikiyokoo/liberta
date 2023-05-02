class ChatChannel < ApplicationCable::Channel
  def subscribed
    chatroom = Chatroom.find(params[:chatroom_id])
    stream_for chatroom
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    message = Message.create!(
      chatroom_id: data['chatroom_id'],
      user_id: data['userId'],
      content: data['content']
    )
  
    # ブロードキャストメッセージ
    ChatChannel.broadcast_to(message.chatroom, {
      id: message.id,
      content: message.content,
      userId: message.user_id,
    })
  end
end
