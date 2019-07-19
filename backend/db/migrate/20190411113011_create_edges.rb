class CreateEdges < ActiveRecord::Migration[5.2]
  def change
    create_table :edges do |t|
      t.string :name
      t.references :from_node, foreig_key: true
      t.references :to_node, foreig_key: true

      t.timestamps
    end
  end
end
