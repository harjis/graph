class Node < ApplicationRecord
  has_many :positions
  has_many :graphs, through: :positions
  has_many :from_edges, class_name: 'Edge', inverse_of: :from_node, foreign_key: 'from_node_id'
  has_many :to_edges, class_name: 'Edge', inverse_of: :to_node, foreign_key: 'to_node_id'

  def as_json_by_graph(graph_id)
    position = self.positions.where('graph_id = ?', graph_id).first
    {
      content: self.content,
      created_at: self.created_at,
      to_edge_ids: self.to_edge_ids,
      id: self.id,
      name: self.name,
      type: self.type,
      updated_at: self.updated_at,
      x: position.x,
      y: position.y
    }
  end

  def to_edge_ids
    self.to_edges.pluck(:id)
  end

  def ancestors
    self.to_edges.map(&:from_node)
  end
end
