class GraphsController < ApplicationController
  def index
    @graphs = Graph.all
    render json: @graphs
  end

  def save_all
    graph_service = GraphService.new(params.permit!)
    graph = graph_service.save
    if graph_service.errors.count.zero?
      render json: graph
    else
      render json: graph_service.errors
    end
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
