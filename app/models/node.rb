class Node < ApplicationRecord
  belongs_to :graph
  has_many :from_edges,
           class_name: 'Edge',
           inverse_of: :from_node,
           foreign_key: 'from_node_id',
           dependent: :destroy
  has_many :to_edges,
           class_name: 'Edge',
           inverse_of: :to_node,
           foreign_key: 'to_node_id',
           dependent: :destroy

  audited associated_with: :graph
  has_associated_audits

  def as_json(options = {})
    {
      content: content,
      errors: errors,
      graphId: graph.id,
      toEdgeIds: to_edge_ids,
      id: id,
      name: name,
      type: type,
      x: x,
      y: y
    }
  end


  def to_edge_ids
    to_edges.pluck(:id)
  end

  def ancestors
    to_edges.map do |to_edge|
      to_edge.from_node.type == 'NodeRefNode' ? to_edge.from_node.node_ref : to_edge.from_node
    end
  end
end
