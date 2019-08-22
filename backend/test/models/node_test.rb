require 'test_helper'

class NodeTest < ActiveSupport::TestCase
  test "can not create node without graph" do
    node = InputNode.new(name: 'Node 1')
    refute node.save
  end

  test "can create node with graph" do
    graph = Graph.create(name: 'Graph 1')
    node = InputNode.new(name: 'Node 1')
    node.graph = graph
    assert node.save
  end

  test "cascade deletes from edges" do
    graph = Graph.create(name: 'Graph 1')
    node = InputNode.create(name: 'InputNode 1', graph: graph)
    node2 = OutputNode.create(name: 'InputNode 1', graph: graph)
    Edge.create(from_node: node, to_node: node2)
    assert_equal 1, Edge.count

    node.destroy

    assert_equal 0, Edge.count
  end

  test "cascade deletes to edges" do
    graph = Graph.create(name: 'Graph 1')
    node = InputNode.create(name: 'InputNode 1', graph: graph)
    node2 = OutputNode.create(name: 'InputNode 1', graph: graph)
    Edge.create(from_node: node, to_node: node2)
    assert_equal 1, Edge.count

    node2.destroy

    assert_equal 0, Edge.count
  end
end
