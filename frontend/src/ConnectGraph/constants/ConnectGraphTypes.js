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

type AddNode = {| type: 'NODES/ADD_NODE', node: Node |};
type FetchNodesStart = { type: 'NODES/FETCH_START' };
type FetchNodesSuccess = { type: 'NODES/FETCH_SUCCESS', nodes: Node[] };
type FetchNodesError = { type: 'NODES/FETCH_ERROR', error: string };
type UpdateNode = { type: 'NODES/UPDATE_NODE', node: Node };
export type NodeAction =
  | AddNode
  | FetchNodesStart
  | FetchNodesSuccess
  | FetchNodesError
  | UpdateNode;
