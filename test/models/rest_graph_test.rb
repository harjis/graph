require 'test_helper'

class RestGraphTest < ActiveSupport::TestCase
  test "nodes content " do
    rest_graph = RestGraph.new(name: 'Rest Graph 1')
    node = Node.new(name: 'Input node')
    node.content = { type: 'input', sub_type: 'rest' }
    rest_graph.nodes << node
    assert rest_graph.save
  end

  test "node subtype can not be file" do
    rest_graph = RestGraph.new(name: 'Rest Graph 1')
    node = Node.new(name: 'Input node')
    node.content = { type: 'input', sub_type: 'file' }
    rest_graph.nodes << node
    refute rest_graph.save
  end
end
