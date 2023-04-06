class TeacherProfileController < ApplicationController
    def create
        teacher_profile = TeacherProfile.new(teacher_profile_params)

        if teacher_profile.save
        else
        end
    end

    private

    def student_profile_params
        params.require(:teacher_profile).permit(age,:gender,:subjects,:university,:subjects)
    end
end
