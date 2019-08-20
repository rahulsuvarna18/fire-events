Rails.application.routes.draw do
  # devise_for :users
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :events, only: [:index, :create] do
    resources :favourites, only: [:create, :destroy]
  end

  devise_for :users,
    controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  get 'users/dashboard', to: 'users#dashboard'


end
