class AddYToNodes < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :y, :float, default: 0
  end
end
