module NodeLoader
  def self.eager_load(graph_id)
    eager_load_node(Graph.find(graph_id).root_node)
  end

  def self.eager_load_node(node)
    node_hash = node.as_json.except!(:errors)
    node_hash[:ancestors] = node.ancestors.map { |ancestor| eager_load_node(ancestor) }
    node_hash
  end
end
