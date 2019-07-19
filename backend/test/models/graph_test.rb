require 'test_helper'

class GraphTest < ActiveSupport::TestCase
  test "auditting" do
    graph = Graph.new(name: 'Graph 1')
    node = Node.new(name: 'Node 1')
    graph.nodes << node

    graph.save

    node2 = Node.new(name: 'Node 2')
    graph.nodes << node2

    node3 = Node.new(name: 'Node 3')
    graph.nodes << node3

    graph.save

    graph.reload

    edge = Edge.new(from_node: node, to_node: node2)
    edge.save

    edge.to_node = node3
    edge.save

    graph.undo
    graph.reload
    edge.reload
    assert_equal node2.id, edge.to_node.id

    graph.undo

    graph.reload
    assert_equal 0, graph.uniq_edges.count
  end
end
