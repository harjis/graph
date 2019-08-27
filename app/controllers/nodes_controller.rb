class NodesController < ApplicationController
  def index
    @nodes = graph.all_related_nodes
    render json: @nodes
  end

  private

  def graph
    Graph.find(params[:graph_id])
  end
end
