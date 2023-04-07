class Api::V1::StudentProfilesController < ApplicationController

    def create
        student_profile = StudentProfile.new(student_profile_params)

        if student_profile.save
            render :json => student_profile
        else
            render :json => student_profile.errors, :status => :unprocessable_entity
        end
    end

    private

    def student_profile_params
        params.require(:student_profile).permit(:gender,:grade,:age,:subjects,:school,:user_id)
    end
