class NodesController < ApplicationController
  def index
    render json: graph.all_related_nodes_as_json
  end

  def create
    position = Position.new(position_params)
    position.graph = graph
    position.build_node(node_params)
    position.save
    render json: position.node.as_json_by_graph(graph.id)
  end

  def update
    Position
      .by_graph_and_node(params[:graph_id], params[:id])
      .update(position_params)
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
    params.permit(:name, :type).slice(:name, :type)
  end

  def position_params
    params.permit(:x, :y).slice(:x, :y)
  end
end
