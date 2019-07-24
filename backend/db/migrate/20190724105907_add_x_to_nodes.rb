class AddXToNodes < ActiveRecord::Migration[5.2]
  def change
    add_column :nodes, :x, :float, default: 0
  end
end
