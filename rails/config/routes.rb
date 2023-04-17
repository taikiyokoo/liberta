Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :teacher_profiles
      resources :student_profiles
      resources :users do
        member do 
          get :check_liked
          get :liked_users
          get :liking_users
        end
      end
      resources :likes
    end
  end
  namespace :api do
    namespace :v1 do
      resources :test,only: %i[index]
      
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
