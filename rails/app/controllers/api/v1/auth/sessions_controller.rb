# ログイン状態確認用コントローラー
class Api::V1::Auth::SessionsController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
    def index
      Rails.logger.debug("Current user: #{current_api_v1_user.inspect}")
      
      if current_api_v1_user
        render json: { is_login: true, data: current_api_v1_user }
      else
        render json: { is_login: false, message: "ユーザーが存在しません" }
      end
    end
  end
