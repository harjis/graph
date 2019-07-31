// @flow
import * as React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import reducer, { initialState } from '../reducers/graphReducer';
import {
  addNode,
  dragNode,
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSucceed,
  startNodeDrag,
  stopNodeDrag
} from '../actions/nodeActions';
import {
  addEdge,
  fetchEdgesError,
  fetchEdgesStart,
  fetchEdgesSucceed
} from '../actions/edgeActions';
import { undoGraph } from '../api/graphs';
import { createNode, fetchNodes, updateNode } from '../api/nodes';
import { fetchEdges } from '../api/edges';

type OnDragHandler = (event: MouseEvent) => void;

const debouncedCreateNode = AwesomeDebouncePromise(createNode, 200);
const debounceUpdateNode = AwesomeDebouncePromise(updateNode, 200);
export default function useConnectGraph(graphId: number) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch(fetchNodesStart());
      try {
        const result = await fetchNodes(graphId);
        if (!didCancel) {
          dispatch(fetchNodesSucceed(result));
        }
      } catch (error) {
        if (!didCancel) {
          dispatch(fetchNodesError(error));
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [graphId]);

  React.useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch(fetchEdgesStart());
      try {
        const result = await fetchEdges(graphId);
        if (!didCancel) {
          dispatch(fetchEdgesSucceed(result));
        }
      } catch (error) {
        if (!didCancel) {
          dispatch(fetchEdgesError(error));
        }
      }
    };
    fetchData();

    return () => {
      didCancel = true;
    };
  }, [graphId]);

  const onAddNode = React.useCallback(() => {
    const addNode2 = async () => {
      const node = await debouncedCreateNode(graphId);
      dispatch(addNode(node));
    };
    addNode2();
  }, [graphId]);

  const onUndo = React.useCallback(() => {
    const undo = async () => {
      await undoGraph(graphId);
      const nodes = await fetchNodes(graphId);
      const edges = await fetchEdges(graphId);
      // TODO: This feels like a code smell. When undoing graph the edges need to be dispatched to store first
      // It is possible that a non-own node gets removed when an edge is removed. In that case the new nodes
      // do not have all the required nodes that old edges have.
      dispatch(fetchEdgesSucceed(edges));
      dispatch(fetchNodesSucceed(nodes));
    };
    undo();
  }, [graphId]);

  const onDrag = React.useRef<OnDragHandler>((event: MouseEvent) => {
    const { pageX, pageY } = event;
    dispatch(dragNode(pageX, pageY));
  });

  const onStartDrag = (nodeId: number, event: SyntheticMouseEvent<Element>) => {
    const { pageX, pageY } = event;
    const nodeOffset = { x: pageX, y: pageY };
    dispatch(startNodeDrag(nodeId, nodeOffset));
    window.addEventListener('mousemove', onDrag.current);
  };

  const onStopDrag = React.useCallback(() => {
    window.removeEventListener('mousemove', onDrag.current);
    dispatch(stopNodeDrag());
    const node = state.nodes.nodes.find(node => node.id === state.nodes.draggedNodeId);
    const onStopDrag2 = async () => {
      await debounceUpdateNode(node);
    };
    onStopDrag2();
  }, [state.nodes, state.nodes.draggedNodeId]);

  return { state, onAddNode, onUndo, onStartDrag, onStopDrag };
}
