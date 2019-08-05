class EdgesController < ApplicationController
  def index
    @edges = graph.uniq_edges
    render json: @edges
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
