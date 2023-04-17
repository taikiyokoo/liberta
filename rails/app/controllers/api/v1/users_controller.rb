class Api::V1::UsersController < ApplicationController

    def index
        users = User.all
        render json: users.as_json(include: [:teacher_profile, :student_profile])
    end

    def show
        user = User.find(params[:id])
        render json: user.as_json(include: [:teacher_profile, :student_profile])
    end

    def check_liked
        user = User.find(params[:id])
        liked = user.liked?(params[:user_id])
        render json: liked
    end

    def liked_users
        user = User.find(params[:id])
        liked_users = user.liked_users
        render json: liked_users.as_json(include: [:teacher_profile, :student_profile])
    end

    def liking_users
        user = User.find(params[:id])
        liking_users = user.liking_users
        render json: liking_users.as_json(include: [:teacher_profile, :student_profile])
    end

end