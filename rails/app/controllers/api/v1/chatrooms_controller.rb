class Api::V1::ChatroomsController < ApplicationController

    def create
        user1_id = params[:user1_id]
        user2_id = params[:user2_id]

        chatroom = Chatroom.find_existing_room(user1_id, user2_id)

        if chatroom
        render json: chatroom
        else
        chatroom = Chatroom.create(user1_id: user1_id, user2_id: user2_id)
        render json: chatroom
        end
    end

    def show
        chatroom =Chatroom.find([params[:id]])
        users = []
        user1 = User.find(chatroom[0].user1_id)
        user2 = User.find(chatroom[0].user2_id)
        users.push(user1,user2)
        render json: users
    end

    private

    def chatroom_params
        params.require(:chatroom).permit(:user1_id, :user2_id)
    end

end

