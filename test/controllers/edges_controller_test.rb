require 'test_helper'

class EdgesControllerTest < ActionDispatch::IntegrationTest
  test "create" do
    graph = setup_test_data

    params = { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id }
    assert_difference('Edge.count', 1) do
      post '/graphs/' + graph.id.to_s + '/edges', params: params
    end
  end

  test 'destroy' do
    graph = setup_test_data

    params = { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id }
    post '/graphs/' + graph.id.to_s + '/edges', params: params
    edge = JSON.parse(@response.body)
    delete '/graphs/' + graph.id.to_s + '/edges/' + edge['id'].to_s
  end

  def setup_test_data
    graph = Graph.new(name: 'Graph 1')
    node = Node.new(name: 'Node 1')
    node2 = Node.new(name: 'Node 2')
    graph.nodes = [node, node2]

    graph.save

    graph
  end
end
