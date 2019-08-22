require 'test_helper'

class GraphsControllerTest < ActionDispatch::IntegrationTest
  test 'responds with graph if save all is successful' do
    graph = Graph.create(name: 'Graph 1')
    params = {
      graph: { id: graph.id, name: 'Updated Graph 1' },
      nodes: [
        { name: 'Node 1', type: 'InputNode', clientId: SecureRandom.uuid },
        { name: 'Node 2', type: 'OutputNode', clientId: SecureRandom.uuid }
      ]
    }

    post "/graphs/#{graph.id}/save_all", params: params
    response = JSON.parse(@response.body)
    assert_equal 1, Graph.count
    assert_equal 2, Node.count
    assert_equal 'Updated Graph 1', response['name']
  end

  # TODO fix this
  # test 'responds with errors if save all is unsuccessful' do
  #   graph = Graph.create(name: 'Graph 1')
  #   params = {
  #     graph: { id: graph.id, name: 'Updated Graph 1' },
  #     nodes: [
  #       { name: 'Node 1', type: 'OutputNode', clientId: SecureRandom.uuid },
  #       { name: 'Node 2', type: 'OutputNode', clientId: SecureRandom.uuid }
  #     ]
  #   }
  #
  #   post "/graphs/#{graph.id}/save_all", params: params
  #   response = JSON.parse(@response.body)
  #   assert_equal 1, Graph.count
  #   assert_equal 0, Node.count
  #
  #   assert response.count > 0
  # end
end
