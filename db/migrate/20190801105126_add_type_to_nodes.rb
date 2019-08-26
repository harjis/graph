class AddTypeToNodes < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :type, :string, null: false
  end
end
