class Api::V1::TeacherProfilesController < ApplicationController

    def create
        params[:subjects] = params[:subjects].to_json
        teacher = TeacherProfile.new(teacher_profile_params)

        if teacher.save
            render :json => teacher
        else
            render :json => teacher.errors, :status => :unprocessable_entity
        end
    end

    private

    def teacher_profile_params
        params.permit(:age,:gender,:subjects,:university,:user_id)
    end
end