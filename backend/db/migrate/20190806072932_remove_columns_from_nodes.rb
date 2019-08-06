class RemoveColumnsFromNodes < ActiveRecord::Migration[5.2]
  def change
    remove_column :nodes, :x, :float
    remove_column :nodes, :y, :float
    remove_reference :nodes, :graph, foreign_key: true
  end
end
