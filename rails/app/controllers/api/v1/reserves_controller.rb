class Api::V1::ReservesController < ApplicationController

    def create
        reserve = Reserve.new(reserve_params)

        if reserve.save
            render json: reserve
        else
            render json: { error: reserve.errors.full_messages }, status: :unprocessable_entity
        end 
    end

    def approve
        reserve = Reserve.find(params[:id])
        reserve.status = 1
        reserve.save
        render json: reserve
    end

    def reject
        reserve = Reserve.find(params[:id])
        reserve.status = 2
        reserve.save
        render json: reserve
    end

    def cancel
        reserve = Reserve.find(params[:id])
        reserve.status = 3
        reserve.save
        render json: reserve
    end

    def complete
        reserve = Reserve.find(params[:id])
        reserve.status = 4
        reserve.save
        render json: reserve
    end

    def show
        reserve = Reserve.find(params[:id])
        render json: reserve
    end



    private
    def reserve_params
        params.permit(:teacher_id, :student_id, :start_time, :end_time, :fee, :status)
    end

end