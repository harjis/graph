class NodesController < ApplicationController
  def index
    render json: graph.nodes
  end

  def create
    render json: graph.nodes.create(node_params)
  end

  def update
    render json: Node.find(params[:id]).update(node_params)
  end

  def destroy
    render json: Node.destroy(params[:id])
  end

  private

  def graph
    Graph.find(params[:graph_id])
  end

  def node_params
    params.permit(:name)
  end
end
