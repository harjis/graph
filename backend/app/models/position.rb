class Position < ApplicationRecord
  belongs_to :graph
  belongs_to :node

  scope :by_graph_and_node, -> (graph_id, node_id) {
    find_by("graph_id = ? AND node_id = ?", graph_id, node_id)
  }
end
