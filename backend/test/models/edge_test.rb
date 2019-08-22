require 'test_helper'

class EdgeTest < ActiveSupport::TestCase
  test "can not create without from node and to node" do
    edge = Edge.new
    refute edge.save
  end

  test "can not create without from node and with to node" do
    graph = Graph.create(name: 'Graph 1')
    to_node = OutputNode.create(name: 'OutputNode 1', graph: graph)
    edge = Edge.new(to_node: to_node)
    refute edge.save
  end

  test "can not create without to node and with from node" do
    graph = Graph.create(name: 'Graph 1')
    from_node = InputNode.create(name: 'InputNode 1', graph: graph)
    edge = Edge.new(from_node: from_node)
    refute edge.save
  end

  test "can create with from node and to node" do
    graph = Graph.create(name: 'Graph 1')
    from_node = InputNode.create(name: 'InputNode 1', graph: graph)
    to_node = OutputNode.create(name: 'OutputNode 1', graph: graph)
    edge = Edge.new(from_node: from_node, to_node: to_node)
    assert edge.save
  end

  test "deleting edge does not delete nodes" do
    graph = Graph.create(name: 'Graph 1')
    from_node = InputNode.create(name: 'InputNode 1', graph: graph)
    to_node = OutputNode.create(name: 'OutputNode 1', graph: graph)
    edge = Edge.new(from_node: from_node, to_node: to_node)
    edge.save
    edge.destroy

    assert_equal 2, Node.count
  end

  test "can not draw edge between 2 graphs" do
    graph = Graph.create(name: 'Graph 1')
    from_node = InputNode.create(name: 'InputNode 1', graph: graph)
    graph2 = Graph.create(name: 'Graph 2')
    to_node = OutputNode.create(name: 'OutputNode 1', graph: graph2)
    edge = Edge.new(from_node: from_node, to_node: to_node)
    refute edge.save
  end
end
