class AddTypeToGraphs < ActiveRecord::Migration[5.2]
  def change
    add_column :graphs, :type, :string
  end
end
