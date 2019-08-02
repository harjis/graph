json.array! @nodes do |node|
  json.cache! ['v1', node] do
    json.partial! 'nodes/node', node: node
  end
end
