// @flow
import * as React from 'react';

import reducer, { initialState } from '../reducers/graphReducer';
import {
  addNode,
  dragNode,
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSucceed, invalidData,
  startNodeDrag,
  stopNodeDrag
} from '../actions/nodeActions';
import {
  addEdge,
  deleteEdge,
  fetchEdgesError,
  fetchEdgesStart,
  fetchEdgesSucceed
} from '../actions/edgeActions';
import { fetchNodes } from '../api/nodes';
import { fetchEdges } from '../api/edges';
import type { Edge } from '../constants/ConnectGraphTypes';
import { createInputNode, createOutputNode } from '../utils/nodeUtils';
import { resetDb, saveAll, undoGraph } from '../api/graphs';
import { createEdge } from "../utils/edgeUtils";
import { setSaving } from "../actions/savingActions";

type OnDragHandler = (event: MouseEvent) => void;

export default function useConnectGraph(graphId: string) {
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

  const onAddInputNode = () => {
    const node = createInputNode(graphId);
    dispatch(addNode(node));
  };

  const onAddOutputNode = () => {
    const node = createOutputNode(graphId);
    dispatch(addNode(node));
  };

  const onDrag = React.useRef<OnDragHandler>((event: MouseEvent) => {
    const { pageX, pageY } = event;
    dispatch(dragNode(pageX, pageY));
  });

  const onStartDrag = (nodeId: string, event: SyntheticMouseEvent<Element>) => {
    const { pageX, pageY } = event;
    const nodeOffset = { x: pageX, y: pageY };
    dispatch(startNodeDrag(nodeId, nodeOffset));
    window.addEventListener('mousemove', onDrag.current);
  };

  const onStopDrag = () => {
    window.removeEventListener('mousemove', onDrag.current);
    dispatch(stopNodeDrag());
  };

  const onAddEdge = (fromNodeId: string, toNodeId: string) => {
    const edge = createEdge(fromNodeId, toNodeId);
    dispatch(addEdge(edge));
  };

  const onDeleteEdge = (edge: Edge) => {
    dispatch(deleteEdge(edge));
  };

  const onSaveAll = () => {
    const saveAll2 = async () => {
      dispatch(setSaving(true));
      const errors = await saveAll(graphId, state.nodes.nodes, state.edges.edges);
      if (errors) {
        dispatch(invalidData(['Nooo!']));
        setTimeout(() => {
          dispatch(invalidData([]));
        }, 3000);
      }
      dispatch(setSaving(false));
    };
    saveAll2();
  };

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
    onStartDrag,
    onStopDrag,
    onAddEdge,
    onDeleteEdge,
    onSaveAll,
    onUndo,
    onResetDb
  };
}
