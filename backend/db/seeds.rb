# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Default
#
# graph = Graph.new(name: 'Graph 1')
# node = InputNode.new(name: 'InputNode 1', x: 10, y: 10)
# node2 = InputNode.new(name: 'InputNode 2', x: 200, y: 10)
# node3 = OutputNode.new(name: 'OutputNode 3', x: 200, y: 200)
# graph.nodes = [node, node2, node3]
# graph.save
#
# edge = Edge.new(from_node: node, to_node: node3)
# edge.save
# edge2 = Edge.new(from_node: node2, to_node: node3)
# edge2.save
#
# graph = Graph.new(name: 'Graph 2')
# node21 = InputNode.new(name: 'InputNode 21', x: 10, y: 10)
# node22 = OutputNode.new(name: 'OutputNode 22', x: 20, y: 20)
# graph.nodes = [node21, node22]
# graph.save
#
# edge = Edge.new(from_node: node21, to_node: node22)
# edge.save

# Testing
#
graph = Graph.new(name: 'Graph 1')
node1 = InputNode.new(name: 'InputNode 1')
node2 = OutputNode.new(name: 'OutputNode 1')

graph.save
node1.save
node2.save
node1_position = Position.new(x: 50, y: 200, graph: graph, node: node1)
node2_position = Position.new(x: 300, y: 400, graph: graph, node: node2)
node1_position.save
node2_position.save
edge = Edge.new(from_node: node1, to_node: node2)
edge.save

graph2 = Graph.new(name: 'Graph 2')
node3 = InputNode.new(name: 'InputNode 2')
node4 = OutputNode.new(name: 'OutputNode 2')

graph2.save
node3.save
node4.save

node3_position = Position.new(x: 10, y: 10, graph: graph2, node: node3)
node4_position = Position.new(x: 400, y: 200, graph: graph2, node: node4)
node3_position.save
node4_position.save

edge2 = Edge.new(from_node: node3, to_node: node4)
edge2.save

edge2 = Edge.new(from_node: node4, to_node: node2)
edge2.save
node4_position2 = Position.new(x: 10, y: 20, graph: graph, node: node4)
node4_position2.save
