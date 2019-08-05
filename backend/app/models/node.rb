class Node < ApplicationRecord
  belongs_to :graph
  has_many :from_edges, class_name: 'Edge', inverse_of: :from_node, foreign_key: 'from_node_id'
  has_many :to_edges, class_name: 'Edge', inverse_of: :to_node, foreign_key: 'to_node_id'

  audited associated_with: :graph
  has_associated_audits

  def as_json(options = {})
    {
      content: self.content,
      created_at: self.created_at,
      graph_id: self.graph_id,
      to_edge_ids: self.to_edge_ids,
      id: self.id,
      name: self.name,
      type: self.type,
      updated_at: self.updated_at,
      x: self.x,
      y: self.y
    }
  end


  def to_edge_ids
    self.to_edges.pluck(:id)
  end

  def ancestors
    self.to_edges.map(&:from_node)
  end
end
