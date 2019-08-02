json.array! @nodes do |node|
  # TODO: No idea if to_edge_ids in cache is is a good idea
  json.cache! ['v1', node, node.to_edge_ids.join('')] do
    json.partial! 'nodes/node', node: node
  end
end
