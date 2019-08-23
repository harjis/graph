class OutputNode < Node
  validate :only_one_output_node?

  def only_one_output_node?
    # This is a bit of a hack.
    persisted_output_node_count = graph.nodes.select { |node| node.type == 'OutputNode' && node.persisted? }.count
    if !id.is_a?(Integer) && persisted_output_node_count == 1
      errors.add(:graph, 'can only have one output node')
    end

    unpersisted_output_node_count = graph.nodes.select { |node| node.type == 'OutputNode' }.count
    if unpersisted_output_node_count > 1
      errors.add(:graph, 'can only have one output node')
    end
  end
end
