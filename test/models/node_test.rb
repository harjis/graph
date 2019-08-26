require 'test_helper'

class NodeTest < ActiveSupport::TestCase
  test "json as content" do
    graph = Graph.new(name: 'Graph 1')
    node = Node.new(name: 'Input node 1')
    node.content = { type: :input }
    graph.nodes << node
    graph.save

    pp graph.nodes.inspect
  end
end
