class Graph < ApplicationRecord
  has_many :nodes
  has_many :from_edges, through: :nodes, source: :from_edges
  has_many :to_edges, through: :nodes, source: :to_edges
  accepts_nested_attributes_for :nodes

  has_associated_audits

  def root_node
    self.nodes.where("type = 'OutputNode'").first
  end

  # A bit misleading name. This method returns own nodes and all first level non-own nodes.
  # If a non-own node has other nodes those are not fetched.
  def all_related_nodes
    edges = uniq_edges
    Node.where(id: (edges.map(&:from_node_id) + edges.map(&:to_node_id) + self.nodes.map(&:id)).uniq)
  end

  def uniq_edges
    (self.from_edges + self.to_edges).uniq { |edge| edge.id }
  end

  def undo
    auditable = all_audits_desc.first
    return unless auditable
    auditable.auditable_type.constantize.without_auditing do
      auditable.undo
      auditable.destroy
    end
  end

  private

  def all_audits_desc
    (self.associated_audits + self.uniq_edges.map(&:audits))
      .flatten
      .sort { |x, y| y.id <=> x.id }
  end
end
