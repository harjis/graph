class AddNodeRefToNodes < ActiveRecord::Migration[5.2]
  def change
    add_reference :nodes, :node_ref, index: true
  end
end
