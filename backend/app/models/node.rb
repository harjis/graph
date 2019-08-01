class Node < ApplicationRecord
  belongs_to :graph
  has_many :from_edges, class_name: 'Edge', inverse_of: :from_node, foreign_key: 'from_node_id'
  has_many :to_edges, class_name: 'Edge', inverse_of: :to_node, foreign_key: 'to_node_id'

  audited associated_with: :graph
  has_associated_audits

  def serializable_hash options = nil
    super.merge "type" => type
  end

  def ancestors
    self.to_edges.map(&:from_node)
  end
end
