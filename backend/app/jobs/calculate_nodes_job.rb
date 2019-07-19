class CalculateNodesJob < ApplicationJob
  queue_as :default

  def perform(graph_id)
    node_count = Graph.find(graph_id).nodes.count
    NodeCount.create(count: node_count)
  end
end
