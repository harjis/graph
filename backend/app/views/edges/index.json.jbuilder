json.array! @edges do |edge|
  json.cache! edge do
    json.partial! 'edges/edge', edge: edge
  end
end
