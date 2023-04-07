class Api::V1::TeacherProfilesController < ApplicationController
def create
    teacher_profile = TeacherProfile.new(teacher_profile_params)

    if teacher_profile.save
        render :json => teacher_profile
    else
        render :json => teacher_profile.errors, :status => :unprocessable_entity
    end
end

private

def teacher_profile_params
    params.require(:teacher_profile).permit(age,:gender,:subjects,:university,:user_id)
end
end