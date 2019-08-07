require 'test_helper'

class GraphServiceTest < ActiveSupport::TestCase
  test "saves Graph" do
    params = { name: 'Graph 1' }
    assert_difference 'Graph.count', 1 do
      GraphService.new(params).save
    end
  end

  test "saves Graphs Nodes" do
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode', client_id: SecureRandom.uuid },
        { name: 'Node 2', type: 'OutputNode', client_id: SecureRandom.uuid }
      ]
    }
    assert_difference 'Node.count', 2 do
      GraphService.new(params).save
    end
  end

  test "knows how to update graphs nodes" do
    node1_id = SecureRandom.uuid
    node2_id = SecureRandom.uuid
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode', client_id: node1_id },
        { name: 'Node 2', type: 'OutputNode', client_id: node2_id }
      ]
    }
    graph = GraphService.new(params).save
    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode', client_id: node1_id },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode', client_id: node2_id }
      ]
    }
    graph = GraphService.new(new_params).save

    assert_equal graph.nodes.first.name, 'New Node 1'
    assert_equal graph.nodes.second.name, 'Node 2'
  end

  test "does it also delete" do
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode' },
        { name: 'Node 2', type: 'OutputNode' }
      ]
    }
    graph = GraphService.new(params).save
    second_node = Node.find_by(name: 'Node 2')
    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: second_node.id, name: 'Node 2' }
      ]
    }
    graph = GraphService.new(new_params).save

    assert_equal 1, graph.nodes.count
  end

  test "knows how to update graphs nodes and those edges" do
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode' },
        { name: 'Node 2', type: 'OutputNode' }
      ]
    }
    graph = GraphService.new(params).save
    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode' },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode' }
      ]
    }
    graph = GraphService.new(new_params).save

    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode' },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode' }
      ],
      edges: [
        { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id }
      ]
    }
    graph = GraphService.new(new_params).save

    assert_equal graph.nodes.first.name, 'New Node 1'
    assert_equal graph.nodes.second.name, 'Node 2'
    assert_equal Edge.count, 1
    assert_equal Edge.first.from_node, Node.first
    assert_equal Edge.first.to_node, Node.second
  end

  test "does not allow duplicate edges" do
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode' },
        { name: 'Node 2', type: 'OutputNode' }
      ]
    }
    graph = GraphService.new(params).save
    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode' },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode' }
      ],
      edges: [
        { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id },
        { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id }
      ]
    }

    assert_raise(ActiveRecord::RecordNotUnique) {
      GraphService.new(new_params).save
    }
  end

  test "deletes edges" do
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode' },
        { name: 'Node 2', type: 'OutputNode' }
      ]
    }
    graph = GraphService.new(params).save
    new_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode' },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode' }
      ],
      edges: [
        { from_node_id: graph.nodes.first.id, to_node_id: graph.nodes.second.id }
      ]
    }
    GraphService.new(new_params).save
    delete_params = {
      id: graph.id,
      name: graph.name,
      nodes: [
        { id: graph.nodes.first.id, name: 'New Node 1', type: 'InputNode' },
        { id: graph.nodes.second.id, name: 'Node 2', type: 'OutputNode' }
      ],
      edges: []
    }
    GraphService.new(delete_params).save
    assert_equal 0, Edge.count
  end

  test "can create all at once" do
    node1_id = SecureRandom.uuid
    node2_id = SecureRandom.uuid
    params = {
      name: 'Graph 1',
      nodes: [
        { name: 'Node 1', type: 'InputNode', client_id: node1_id },
        { name: 'Node 2', type: 'OutputNode', client_id: node2_id }
      ],
      edges: [
        { from_node_id: node1_id, to_node_id: node2_id }
      ]
    }
    GraphService.new(params).save

    assert_equal 2, Node.count
    assert_equal 1, Edge.count
  end
end
