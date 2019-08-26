class NodesController < ApplicationController
  def index
    @nodes = graph.all_related_nodes
    render json: @nodes
  end

  def create
    @node = graph.nodes.create(node_params)
    render json: @node
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
    params.permit(:name, :type, :x, :y)
  end
end
