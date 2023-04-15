class Api::V1::UsersController < ApplicationController

    def index
        users = User.all
        render json: users.as_json(include: [:teacher_profile, :student_profile])
    end

    def show
        user = User.find(params[:id])
        render json: user.as_json(include: [:teacher_profile, :student_profile])
    end

end