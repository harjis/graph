class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.string :name
      t.references :graph, foreign_key: true, null: false

      t.timestamps
    end
  end
end
