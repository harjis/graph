class CreatePositions < ActiveRecord::Migration[5.2]
  def change
    create_table :positions do |t|
      t.references :graph, foreign_key: true
      t.references :node, foreign_key: true
      t.float :x, default: 0
      t.float :y, default: 0
    end
  end
end
