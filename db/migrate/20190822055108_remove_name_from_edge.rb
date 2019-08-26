class RemoveNameFromEdge < ActiveRecord::Migration[5.2]
  def change
    remove_column :edges, :name, :string
  end
end
