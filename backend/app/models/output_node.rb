class OutputNode < Node
  validate :has_only_one_output_node

  def has_only_one_output_node
    output_node_count = self.graph.nodes.select { |node| node.type == 'OutputNode' && node.persisted? }.count
    if output_node_count == 1
      errors.add(:graph, 'Graph can only have one output node')
    end
  end
end
