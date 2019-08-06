class EdgesController < ApplicationController
  def index
    render json: graph.all_related_edges
  end

  def create
    @edge = Edge.new(edge_params)
    @edge.save
    render json: @edge
  end

  def destroy
    render json: Edge.destroy(params[:id])
  end

  private

  def edge_params
    params.permit(:from_node_id, :to_node_id)
  end

  def graph
    Graph.find(params[:graph_id])
  end
end
