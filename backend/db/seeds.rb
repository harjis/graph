# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

graph = Graph.new(name: 'Graph 1')
node = Node.new(name: 'Node 1')
node2 = Node.new(name: 'Node 2')
node3 = Node.new(name: 'Node 2')
graph.nodes = [node, node2, node3]
graph.save

edge = Edge.new(from_node: node, to_node: node2)
edge.save
edge2 = Edge.new(from_node: node, to_node: node3)
edge2.save

graph = Graph.new(name: 'Graph 2')
node21 = Node.new(name: 'Node 21')
node22 = Node.new(name: 'Node 22')
graph.nodes = [node21, node22]
graph.save

edge = Edge.new(from_node: node21, to_node: node22)
edge.save
edge2 = Edge.new(from_node: node21, to_node: node)
edge2.save
