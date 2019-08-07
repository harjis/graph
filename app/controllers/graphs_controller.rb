class GraphsController < ApplicationController
  def index
    @graphs = Graph.all
    render json: @graphs
  end

  def save_all
    errors = GraphService.new(params.permit!).save
    render json: errors
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
