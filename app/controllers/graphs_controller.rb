class GraphsController < ApplicationController
  def index
    @graphs = Graph.all
    render json: @graphs
  end

  def show
    @graph = Graph.find(params[:id])
    render json: @graph
  end

  def create
    @graph = Graph.create(graph_params)

    render json: @graph
  end

  def update
    @graph = Graph.find(params[:id])
    @graph.update(graph_params)

    render json: @graph
  end

  def destroy
    Graph.destroy(params[:id])
    render json: true
  end

  def undo
    render json: Graph.find(params[:id]).undo
  end

  def reset
    ResetService.reset
    render json: true
  end

  def calculate_node_count
    job = CalculateNodesJob.set(wait: 1.minute).perform_later(params[:id])
    render json: job
  end

  def get_node_count
    render json: NodeCount.all
  end

  private

  def graph_params
    params.permit(:name)
  end
end
