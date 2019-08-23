class GraphService
  def initialize(params)
    self.params = params
  end

  def save
    self.g = if graph_params[:id]
               update_graph
             else
               create_graph
             end

    g
  end

  def errors
    # So dirty but hey, it's a PoC :D
    g_errors = g.errors.full_messages
    node_errors = g.nodes.map { |node| node.errors.full_messages }
    from_edge_errors = g.from_edges.map { |edge| edge.errors.full_messages }
    to_edge_errors = g.to_edges.map { |edge| edge.errors.full_messages }

    (g_errors + node_errors + from_edge_errors + to_edge_errors).flatten.uniq
  end

  private

  attr_accessor :params, :g

  def create_graph
    graph = Graph.new(graph_params)
    nodes_params.each do |node_params|
      graph.nodes.build(node_params.except(:clientId, :errors, :graphId, :toEdgeIds))
    end
    edges_params.each do |edge_params|
      from = node_map(graph)[edge_params[:fromNodeId]]
      to = node_map(graph)[edge_params[:toNodeId]]
      Edge.create(from_node: from, to_node: to) if from.valid? && to.valid?
    end

    graph.save
    graph
  end

  def update_graph
    graph = Graph.find(graph_params[:id])
    graph.update(graph_params)
    upsert_nodes(graph)
    delete_nodes
    save_edges(graph)
    delete_edges(graph)

    # Everything is persisted correctly but graph needs to be reloaded so that updated data is
    # returned from save function. This is for testing purposes
    graph.reload
    graph
  end

  def upsert_nodes(graph)
    nodes_params.each do |node_params|
      if node_params[:id]
        Node
          .find(node_params[:id])
          .update(node_params.except(:clientId, :errors, :graphId, :toEdgeIds))
      else
        node = graph.nodes.create(node_params.except(:clientId, :errors, :graphId, :toEdgeIds))
        node_params[:id] = node.id
      end
    end
  end

  def delete_nodes
    to_be_deleted = persisted_node_ids - new_node_ids
    Node.delete(to_be_deleted) unless to_be_deleted.empty?
  end

  def save_edges(graph)
    edges_params.select { |edge| edge[:id] == nil }.each do |edge_params|
      from, to = if edge_params[:fromNodeId].is_a?(Integer) && edge_params[:toNodeId].is_a?(Integer)
                   [graph.node_by_id(edge_params[:fromNodeId]), graph.node_by_id(edge_params[:toNodeId])]
                 elsif edge_params[:fromNodeId].is_a?(String) && edge_params[:toNodeId].is_a?(String)
                   [node_map(graph)[edge_params[:fromNodeId]], node_map(graph)[edge_params[:toNodeId]]]
                 elsif edge_params[:fromNodeId].is_a?(String) && edge_params[:toNodeId].is_a?(Integer)
                   [node_map(graph)[edge_params[:fromNodeId]], graph.node_by_id(edge_params[:toNodeId])]
                 else
                   [graph.node_by_id(edge_params[:fromNodeId]), node_map(graph)[edge_params[:toNodeId]]]
                 end
      edge = Edge.create(from_node: from, to_node: to)
      edge_params[:id] = edge.id
    end
  end

  def delete_edges(graph)
    graph.uniq_edges.each do |edge|
      in_params = edges_params.find { |edge_param| edge_param[:id] == edge.id }
      edge.destroy unless in_params
    end
  end

  def node_map(graph)
    nodes_params.each_with_index.inject({}) do |acc, (elem, i)|
      acc.merge(Hash[elem[:clientId], graph.nodes[i]])
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
