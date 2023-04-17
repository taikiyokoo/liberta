class Api::V1::LikesController < ApplicationController

    def create
        like = Like.create(liker_id: params[:liker_id], liked_id: params[:liked_id])
        render json: like
    end

    def destroy
        like = Like.find(params[:id])
        like.destroy
        render json: {message: "Like deleted"}
    end

end