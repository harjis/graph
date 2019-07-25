// @flow

export type Graph = {|
  id: number,
  name: string,
  created_at: string,
  updated_at: string
|};

export type Node = {|
  content: Object,
  created_at: string,
  graph_id: number,
  id: number,
  name: string,
  update_at: string,
  x: number,
  y: number
|};
