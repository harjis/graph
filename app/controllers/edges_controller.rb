class EdgesController < ApplicationController
  def index
    @edges = graph.uniq_edges
    render json: @edges
  end

  private

  def graph
    Graph.find(params[:graph_id])
  end
end
