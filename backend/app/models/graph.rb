class Graph < ApplicationRecord
  has_many :nodes
  has_many :from_edges, through: :nodes, source: :from_edges
  has_many :to_edges, through: :nodes, source: :to_edges
  accepts_nested_attributes_for :nodes

  has_associated_audits

  def uniq_edges
    (self.from_edges + self.to_edges).uniq { |edge| edge.id }
  end

  def undo
    auditable = all_audits_desc.first
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
