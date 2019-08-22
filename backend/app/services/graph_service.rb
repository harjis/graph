class GraphService
  attr_accessor :params, :graph, :node_map

  def initialize(params)
    self.errors = []
    self.params = params
  end

  def save
    save_graph
    save_nodes
    self.node_map = node_map
    delete_nodes
    save_edges
    delete_edges

    graph
  end

  def _errors
    # So dirty but hey, it's a PoC :D
    errors.flatten.uniq
  end

  private

  attr_accessor :errors

  def save_graph
    if graph_params[:id]
      self.graph = Graph.find(graph_params[:id])
      graph.update(graph_params)
    else
      self.graph = Graph.create(graph_params)
      errors << graph.errors.full_messages
    end
  end

  def save_nodes
    nodes_params.each do |node_params|
      if node_params[:id]
        n = Node.find(node_params[:id])
        n.update(node_params.except(:clientId, :errors, :graphId, :toEdgeIds))
        n.graph = graph
        n.save
        errors << n.errors.full_messages
      else
        n = Node.new(node_params.except(:clientId, :errors, :graphId, :toEdgeIds))
        n.graph = graph
        n.save
        errors << n.errors.full_messages
        node_params[:id] = n.id
      end
    end
    graph.reload
  end

  def node_map
    nodes_params.each_with_index.inject({}) do |acc, (elem, i)|
      acc.merge(Hash[elem[:clientId], graph.nodes[i]])
    end
  end

  def delete_nodes
    return unless graph_params[:id]

    to_be_deleted = persisted_node_ids - new_node_ids
    Node.delete(to_be_deleted) unless to_be_deleted.empty?
  end

  def save_edges
    edges_params.select { |edge| edge[:id] == nil }.each do |edge_params|
      from, to = if edge_params[:fromNodeId].is_a?(Integer) && edge_params[:toNodeId].is_a?(Integer)
                   [graph.node_by_id(edge_params[:fromNodeId]), graph.node_by_id(edge_params[:toNodeId])]
                 elsif edge_params[:fromNodeId].is_a?(String) && edge_params[:toNodeId].is_a?(String)
                   [node_map[edge_params[:fromNodeId]], node_map[edge_params[:toNodeId]]]
                 elsif edge_params[:fromNodeId].is_a?(String) && edge_params[:toNodeId].is_a?(Integer)
                   [node_map[edge_params[:fromNodeId]], graph.node_by_id(edge_params[:toNodeId])]
                 else
                   [graph.node_by_id(edge_params[:fromNodeId]), node_map[edge_params[:toNodeId]]]
                 end
      edge = Edge.create(from_node: from, to_node: to)
      errors << edge.errors.full_messages
      edge_params[:id] = edge.id
    end
  end

  def delete_edges
    graph.uniq_edges.each do |edge|
      in_params = edges_params.find { |edge_param| edge_param[:id] == edge.id }
      edge.destroy unless in_params
    end
  end

  def persisted_node_ids
    Graph.find(graph_params[:id]).nodes.map(&:id)
  end

  def new_node_ids
    params[:nodes].select { |node| node[:id] }.map { |node| node[:id] }
  end

  def graph_params
    params[:graph]
  end

  def nodes_params
    params[:nodes] || []
  end

  def edges_params
    params[:edges] || []
  end
end
