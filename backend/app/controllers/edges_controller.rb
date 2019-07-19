class EdgesController < ApplicationController
  def index
    render json: graph.uniq_edges
  end

  def create
    edge = Edge.create(edge_params)
    render json: edge
  end

  def destroy
    Edge.destroy params[:id]
  end

  private

  def edge_params
    params.permit(:from_node_id, :to_node_id)
  end

  def graph
    Graph.find(params[:graph_id])
  end
end
