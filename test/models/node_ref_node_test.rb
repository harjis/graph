require 'test_helper'

class NodeRefNodeTest < ActiveSupport::TestCase
  test "can not create node ref node without node ref" do
    graph = Graph.create(name: 'Graph 1')
    node = NodeRefNode.new(name: 'Node 1', graph: graph)
    refute node.save
  end

  test "can not create node ref node to input node" do
    graph = Graph.create(name: 'Graph 1')
    input_node = InputNode.create(name: 'InputNode 1', graph: graph)
    assert_raise(ActiveRecord::AssociationTypeMismatch) {
      NodeRefNode.create(name: 'Node 1', graph: graph, node_ref: input_node)
    }
  end

  test "can create node ref node with node ref" do
    graph = Graph.create(name: 'Graph 1')
    output_node = OutputNode.create(name: 'OutputNode 1', graph: graph)
    node = NodeRefNode.new(name: 'Node 1', graph: graph, node_ref: output_node)
    assert node.save
  end
end
