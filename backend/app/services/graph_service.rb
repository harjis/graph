class GraphService
  attr_accessor :params, :graph, :node_map, :errors

  def initialize(params)
    self.errors = []
    self.params = params
  end

  def save
    save_graph
    save_nodes
    self.node_map = get_node_map
    delete_nodes
    save_edges
    delete_edges

    # So dirtyy but hey, it's a PoC :D
    self.errors.flatten.uniq
  end

  private

  def save_graph
    if graph_params[:id]
      self.graph = Graph.find(graph_params[:id])
      # self.graph.update(graph_params)
    else
      self.graph = Graph.create(graph_params)
      self.errors << graph.errors.full_messages
    end
  end

  def save_nodes
    nodes_params.each do |node_params|
      if node_params[:id]
        n = Node.find(node_params[:id])
        n.update(node_params.except(:client_id, :errors))
        n.graph = self.graph
        n.save
        self.errors << n.errors.full_messages
      else
        n = Node.new(node_params.except(:client_id, :errors))
        n.graph = self.graph
        n.save
        pp n.errors.full_messages
        self.errors << n.errors.full_messages
        node_params[:id] = n.id
      end
    end
    self.graph.reload
  end

  def get_node_map
    nodes_params.each_with_index.inject({}) do |acc, (elem, i)|
      acc.merge(Hash[elem[:client_id], self.graph.nodes[i]])
    end
  end

  def delete_nodes
    return unless graph_params[:id]
    to_be_deleted = persisted_node_ids - new_node_ids
    Node.delete(to_be_deleted) unless to_be_deleted.size == 0
  end

  def save_edges
    edges_params.select { |edge| edge[:id] == nil }.each do |edge_params|
      from_node, to_node = if edge_params[:from_node_id].is_a?(Integer) && edge_params[:to_node_id].is_a?(Integer)
                             [self.graph.node_by_id(edge_params[:from_node_id]), self.graph.node_by_id(edge_params[:to_node_id])]
                           elsif edge_params[:from_node_id].is_a?(String) && edge_params[:to_node_id].is_a?(String)
                             [node_map[edge_params[:from_node_id]], node_map[edge_params[:to_node_id]]]
                           elsif edge_params[:from_node_id].is_a?(String) && edge_params[:to_node_id].is_a?(Integer)
                             [node_map[edge_params[:from_node_id]], self.graph.node_by_id(edge_params[:to_node_id])]
                           else
                             [self.graph.node_by_id(edge_params[:from_node_id]), node_map[edge_params[:to_node_id]]]
                           end
      edge = Edge.create(from_node: from_node, to_node: to_node)
      self.errors << edge.errors.full_messages
      edge_params[:id] = edge.id
    end
  end

  def delete_edges
    self.graph.uniq_edges.each do |edge|
      in_params = edges_params.find { |edge_param| edge_param[:id] == edge.id }
      edge.destroy unless in_params
    end
  end

  def persisted_node_ids
    Graph.find(graph_params[:id]).nodes.map(&:id)
  end

  def new_node_ids
    params[:nodes].select { |node| !!node[:id] }.map { |node| node[:id] }
  end

  def graph_params
    params.except(:edges, :nodes)
  end

  def nodes_params
    params[:nodes] || []
  end

  def edges_params
    params[:edges] || []
  end
end
