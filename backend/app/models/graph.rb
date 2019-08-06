class Graph < ApplicationRecord
  has_many :positions
  has_many :nodes, through: :positions
  has_many :from_edges, through: :nodes, source: :from_edges
  has_many :to_edges, through: :nodes, source: :to_edges

  def root_node
    # This is a bit on the hacky side. The first OutputNode that graph has is considered to be the root node.
    # This means that insert order of nodes do matter
    self.nodes.where("type = 'OutputNode'").first
  end

  # A bit misleading name. This method returns own nodes and all first level non-own nodes.
  # If a non-own node has other nodes those are not fetched.
  def all_related_nodes_as_json
    self.nodes.map {|node| node.as_json_by_graph(self.id)}
  end

  def all_related_edges
    nodes_ids = self.nodes.map(&:id)
    Edge.where('from_node_id IN (?) AND to_node_id IN (?)', nodes_ids, nodes_ids)
  end
end
