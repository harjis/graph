module ResetService
  def self.reset
    Node.destroy_all

    graph = Graph.first
    node1 = InputNode.new(name: 'InputNode 1', x: 50, y: 200)
    node2 = OutputNode.new(name: 'OutputNode 1', x: 300, y: 400)

    graph.nodes = [node1, node2]
    graph.save
    edge = Edge.new(from_node: node1, to_node: node2)
    edge.save


    graph2 = Graph.second
    node3 = InputNode.new(name: 'InputNode 2', x: 10, y: 10)
    node4 = OutputNode.new(name: 'OutputNode 2', x: 400, y: 200)
    graph2.nodes = [node3, node4]
    graph2.save
    edge2 = Edge.new(from_node: node3, to_node: node4)
    edge2.save

    node_ref_node = NodeRefNode.new(name: 'Node reference node', x: 400, y: 200, node_ref: node4, graph: graph)
    node_ref_node.save
    edge2 = Edge.new(from_node: node_ref_node, to_node: node2)
    edge2.save
  end
end
