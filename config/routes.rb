Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :events

  # resources :users do
  #   collection do
  #     get "dashboard"
  #   end
  # end


  get 'users/dashboard', to: 'users#dashboard'
end
