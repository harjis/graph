// @flow
import * as React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import reducer, { initialState } from '../reducers/graphReducer';
import {
  addNode,
  dragNode,
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSucceed, invalidNode,
  startNodeDrag,
  stopNodeDrag
} from '../actions/nodeActions';
import {
  addEdge,
  fetchEdgesError,
  fetchEdgesStart,
  fetchEdgesSucceed,
  deleteEdge
} from '../actions/edgeActions';
import { resetDb, undoGraph } from '../api/graphs';
import { createNode, fetchNodes, updateNode } from '../api/nodes';
import { createEdge, destroyEdge, fetchEdges } from '../api/edges';
import type { Edge } from '../constants/ConnectGraphTypes';
import { setSaving } from "../actions/savingActions";

type OnDragHandler = (event: MouseEvent) => void;

const debouncedCreateNode = AwesomeDebouncePromise(createNode, 200);
const debounceUpdateNode = AwesomeDebouncePromise(updateNode, 200);
export default function useConnectGraph(graphId: number) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let didCancel = false;
    // TODO: Join these actions
    const fetchNodesAndEdges = async () => {
      dispatch(fetchNodesStart());
      dispatch(fetchEdgesStart());
      try {
        const nodes = await fetchNodes(graphId);
        const edges = await fetchEdges(graphId);
        if (!didCancel) {
          dispatch(fetchNodesSucceed(nodes));
          dispatch(fetchEdgesSucceed(edges));
        }
      } catch (error) {
        if (!didCancel) {
          dispatch(fetchNodesError(error));
          dispatch(fetchEdgesError(error));
        }
      }
    };
    fetchNodesAndEdges();

    return () => {
      didCancel = true;
    };
  }, [graphId]);

  const onAddInputNode = React.useCallback(() => {
    const addNode2 = async () => {
      dispatch(setSaving(true));
      const node = await debouncedCreateNode(graphId, 'InputNode');
      dispatch(addNode(node));
      dispatch(setSaving(false));
    };
    addNode2();
  }, [graphId]);

  const onAddOutputNode = React.useCallback(() => {
    const addNode2 = async () => {
      dispatch(setSaving(true));
      const node = await debouncedCreateNode(graphId, 'OutputNode');
      if (Object.keys(node.errors).length === 0) {
        dispatch(setSaving(false));
        dispatch(addNode(node));
      } else {
        dispatch(setSaving(false));
        dispatch(invalidNode(node.errors));
        setTimeout(() => {
          dispatch(invalidNode({}));
        }, 3000);
      }
    };
    addNode2();
  }, [graphId]);

  const onUndo = React.useCallback(() => {
    const undo = async () => {
      dispatch(setSaving(true));
      await undoGraph(graphId);
      const nodes = await fetchNodes(graphId);
      const edges = await fetchEdges(graphId);
      // TODO: This feels like a code smell. When undoing graph the edges need to be dispatched to store first
      // It is possible that a non-own node gets removed when an edge is removed. In that case the new nodes
      // do not have all the required nodes that old edges have.
      dispatch(fetchEdgesSucceed(edges));
      dispatch(fetchNodesSucceed(nodes));
      dispatch(setSaving(false));
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
      dispatch(setSaving(true));
      await debounceUpdateNode(node);
      dispatch(setSaving(false));
    };
    onStopDrag2();
  }, [state.nodes]);

  const onAddEdge = React.useCallback(
    (fromNodeId: number, toNodeId: number) => {
      const onAddEdge2 = async () => {
        dispatch(setSaving(true));
        const edge = await createEdge(graphId, fromNodeId, toNodeId);
        if (edge) {
          dispatch(addEdge(edge));
        }
        dispatch(setSaving(false));
      };
      onAddEdge2();
    },
    [graphId]
  );

  const onDeleteEdge = React.useCallback(
    (edge: Edge) => {
      const deleteEdge2 = async () => {
        dispatch(setSaving(true));
        const deleted = await destroyEdge(graphId, edge.id);
        if (deleted) {
          dispatch(deleteEdge(edge));
        }
        dispatch(setSaving(false));
      };
      deleteEdge2();
    },
    [graphId]
  );

  const onResetDb = React.useCallback(
    () => {
      const resetDb2 = async () => {
        dispatch(setSaving(true));
        const succeess = await resetDb(graphId);
        dispatch(setSaving(false));
        window.location.reload();
      };
      resetDb2();
    },
    [graphId]
  );

  return {
    state,
    onAddInputNode,
    onAddOutputNode,
    onUndo,
    onStartDrag,
    onStopDrag,
    onAddEdge,
    onDeleteEdge,
    onResetDb
  };
}
