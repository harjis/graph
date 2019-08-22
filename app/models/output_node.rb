class OutputNode < Node
  validate :only_one_output_node?

  def only_one_output_node?
    output_node_count = graph.nodes.select { |node| node.type == 'OutputNode' && node.persisted? }.count
    # This is a bit of a hack.
    if !id.is_a?(Integer) && output_node_count == 1
      errors.add(:graph, 'Graph can only have one output node')
    end
  end
end
