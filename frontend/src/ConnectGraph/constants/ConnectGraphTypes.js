// @flow

export type Graph = {|
  created_at: string,
  id: number,
  name: string,
  updated_at: string
|};

export type NodeType = 'InputNode' | 'OutputNode';
export type Node = {|
  content: Object,
  created_at: string,
  graph_id: number,
  id: number,
  name: string,
  to_edge_ids: number[],
  type: NodeType,
  update_at: string,
  x: number,
  y: number
|};

export type Edge = {|
  created_at: string,
  from_node_id: number,
  id: number,
  name: ?string,
  to_node_id: number,
  updated_at: string
|};

export type Offset = {| x: number, y: number |};
type AddInputNode = {| type: 'NODES/ADD', node: Node |};
type AddOutputNode = {| type: 'NODES/ADD_OUTPUT_NODE', node: Node |};
type FetchNodesStart = { type: 'NODES/FETCH_START' };
type FetchNodesSuccess = { type: 'NODES/FETCH_SUCCESS', nodes: Node[] };
type FetchNodesError = { type: 'NODES/FETCH_ERROR', error: string };
type StartNodeDrag = {
  type: 'NODES/START_DRAG',
  nodeId: number,
  nodeOffset: Offset
};
type DragNode = { type: 'NODES/DRAG', pageX: number, pageY: number };
type StopNodeDrag = { type: 'NODES/STOP_DRAG' };
export type NodeAction =
  | AddInputNode
  | AddOutputNode
  | FetchNodesStart
  | FetchNodesSuccess
  | FetchNodesError
  | StartNodeDrag
  | DragNode
  | StopNodeDrag;

export type AddEdge = { type: 'EDGES/ADD', edge: Edge };
type FetchEdgesStart = { type: 'EDGES/FETCH_START' };
type FetchEdgesSuccess = { type: 'EDGES/FETCH_SUCCESS', edges: Edge[] };
type FetchEdgesError = { type: 'EDGES/FETCH_ERROR', error: string };
export type DeleteEdge = { type: 'EDGES/DELETE', edge: Edge };
export type EdgeAction =
  | AddEdge
  | FetchEdgesStart
  | FetchEdgesSuccess
  | FetchEdgesError
  | DeleteEdge;
