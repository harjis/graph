class NodeRefNode < Node
  belongs_to :node_ref, class_name: "OutputNode"
end
