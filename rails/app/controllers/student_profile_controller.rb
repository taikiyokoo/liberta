class StudentProfileController < ApplicationController

    def create
        student_profile = StudentProfile.new(student_profile_params)

        if student_profile.save
        else
        end
    end

    private

    def student_profile_params
        params.require(:student_profile).permit(:gender,:grade,:age,:subjects,:school)
    end

end
