class Api::V1::MessagesController < ApplicationController

    def index
        messages = Message.where(chatroom_id: params[:chatroom_id])
        render json: messages
    end

end