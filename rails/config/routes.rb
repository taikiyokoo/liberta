Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  namespace :api do
    namespace :v1 do
      resources :teacher_profiles
      resources :student_profiles
      resources :reserves do
        member do
          get :approve
          get :reject
          get :cancel
          get :complete
        end
      end
      resources  :chatrooms do 
        resources :messages
      end
      resources :users do
        collection do
          get :students_search
          get :teachers_search
          get :teachers
          get :students
        end
        member do 
          get :check_liked
          get :liked_users
          get :liking_users
          get :has_requests
          get :has_reserves
          get :is_request
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
