# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_06_073136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audits", force: :cascade do |t|
    t.integer "auditable_id"
    t.string "auditable_type"
    t.integer "associated_id"
    t.string "associated_type"
    t.integer "user_id"
    t.string "user_type"
    t.string "username"
    t.string "action"
    t.text "audited_changes"
    t.integer "version", default: 0
    t.string "comment"
    t.string "remote_address"
    t.string "request_uuid"
    t.datetime "created_at"
    t.index ["associated_type", "associated_id"], name: "associated_index"
    t.index ["auditable_type", "auditable_id", "version"], name: "auditable_index"
    t.index ["created_at"], name: "index_audits_on_created_at"
    t.index ["request_uuid"], name: "index_audits_on_request_uuid"
    t.index ["user_id", "user_type"], name: "user_index"
  end

  create_table "edges", force: :cascade do |t|
    t.string "name"
    t.bigint "from_node_id"
    t.bigint "to_node_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_node_id", "to_node_id"], name: "index_edges_on_from_node_id_and_to_node_id", unique: true
    t.index ["from_node_id"], name: "index_edges_on_from_node_id"
    t.index ["to_node_id"], name: "index_edges_on_to_node_id"
  end

  create_table "graphs", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "type"
  end

  create_table "node_counts", force: :cascade do |t|
    t.integer "count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nodes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "content"
    t.string "type", null: false
  end

  create_table "positions", force: :cascade do |t|
    t.bigint "graph_id"
    t.bigint "node_id"
    t.float "x", default: 0.0
    t.float "y", default: 0.0
    t.index ["graph_id"], name: "index_positions_on_graph_id"
    t.index ["node_id"], name: "index_positions_on_node_id"
  end

  add_foreign_key "positions", "graphs"
  add_foreign_key "positions", "nodes"
end
