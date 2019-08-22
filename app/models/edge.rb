class Edge < ApplicationRecord
  belongs_to :from_node, class_name: 'Node'
  belongs_to :to_node, class_name: 'Node'
  audited associated_with: :from_node
  audited associated_with: :to_node

  validate :only_edges_inside_same_graph

  def as_json(options = {})
    {
      fromNodeId: from_node.id,
      id: id,
      toNodeId: to_node.id
    }
  end

  def only_edges_inside_same_graph
    if self.from_node.nil?
      errors.add(:from_node_id, "From node needs to exist")
      return
    end

    if self.to_node.nil?
      errors.add(:from_node_id, "To node needs to exist")
      return
    end

    if self.from_node.graph_id != self.to_node.graph_id
      errors.add(:to_node_id, "Both nodes need to be on the same graph. From Node graph_id: #{self.from_node.graph_id} & To Node graph_id: #{self.to_node.graph_id}")
    end
  end
end
