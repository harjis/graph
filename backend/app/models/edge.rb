class Edge < ApplicationRecord
  belongs_to :from_node, class_name: 'Node'
  belongs_to :to_node, class_name: 'Node'
  audited associated_with: :from_node
  audited associated_with: :to_node
end
