// @flow

export type Graph = {|
  created_at: string,
  id: number,
  name: string,
  updated_at: string
|};

export type Errors = { [key: $Keys<Node>]: string[] };
export type NodeType = 'InputNode' | 'OutputNode' | 'NodeRefNode';
export type Node = {|
  content: Object,
  created_at: string,
  errors: Errors,
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

export type SavingAction = {| type: 'SAVING', isSaving: boolean |};
export type Offset = {| x: number, y: number |};
type AddNode = {| type: 'NODES/ADD', node: Node |};
type FetchNodesStart = { type: 'NODES/FETCH_START' };
type FetchNodesSuccess = { type: 'NODES/FETCH_SUCCESS', nodes: Node[] };
type FetchNodesError = { type: 'NODES/FETCH_ERROR', error: string };
type InvalidNode = { type: 'NODES/INVALID_NODE', errors: Errors };
type StartNodeDrag = {
  type: 'NODES/START_DRAG',
  nodeId: number,
  nodeOffset: Offset
};
type DragNode = { type: 'NODES/DRAG', pageX: number, pageY: number };
type StopNodeDrag = { type: 'NODES/STOP_DRAG' };
export type NodeAction =
  | AddNode
  | FetchNodesStart
  | FetchNodesSuccess
  | FetchNodesError
  | StartNodeDrag
  | InvalidNode
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
