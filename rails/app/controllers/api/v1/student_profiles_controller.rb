class Api::V1::StudentProfilesController < ApplicationController

    def create
        params[:subjects] = params[:subjects].to_json

        student = StudentProfile.new(student_profile_params)

        if student.save
            render :json => student
        else
            render :json => student.errors, :status => :unprocessable_entity
        end
    end

    private

    def student_profile_params
        params.permit(:gender,:grade,:age,:school,:user_id,:subjects)
    end
end
