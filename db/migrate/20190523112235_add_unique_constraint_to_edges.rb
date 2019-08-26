class AddUniqueConstraintToEdges < ActiveRecord::Migration[5.2]
  def change
    add_index :edges, [:from_node_id, :to_node_id], :unique => true
  end
end
