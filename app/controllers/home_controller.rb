class HomeController < ApplicationController
  def index
    render json: { name: "I'm a home" }
  end
end
