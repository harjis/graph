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
# node = Node.new(name: 'Node 1', x: 10, y: 10)
# node2 = Node.new(name: 'Node 2', x: 100, y: 100)
# node3 = Node.new(name: 'Node 3', x: 200, y: 200)
# graph.nodes = [node, node2, node3]
# graph.save
#
# edge = Edge.new(from_node: node, to_node: node2)
# edge.save
# edge2 = Edge.new(from_node: node, to_node: node3)
# edge2.save
#
# graph = Graph.new(name: 'Graph 2')
# node21 = Node.new(name: 'Node 21', x: 10, y: 10)
# node22 = Node.new(name: 'Node 22', x: 20, y: 20)
# graph.nodes = [node21, node22]
# graph.save
#
# edge = Edge.new(from_node: node21, to_node: node22)
# edge.save
# edge2 = Edge.new(from_node: node21, to_node: node)
# edge2.save

# Testing
#
graph = Graph.new(name: 'Graph 1')
node1 = Node.new(name: 'Node 1', x: 50, y: 200)
node2 = Node.new(name: 'Node 2', x: 300, y: 400)

graph.nodes = [node1, node2]
graph.save
edge = Edge.new(from_node: node1, to_node: node2)
edge.save


graph2 = Graph.new(name: 'Graph 2')
node3 = Node.new(name: 'Node 3', x: 10, y: 10)
node4 = Node.new(name: 'Node 4', x: 400, y: 200)
graph2.nodes = [node3, node4]
graph2.save
edge2 = Edge.new(from_node: node3, to_node: node4)
edge2.save

edge2 = Edge.new(from_node: node4, to_node: node2)
edge2.save
