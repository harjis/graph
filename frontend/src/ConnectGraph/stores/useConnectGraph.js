// @flow
import * as React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import reducer, { initialState } from '../reducers/nodeReducer';
import type { Node } from '../constants/ConnectGraphTypes';
import {
  addNode,
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSucceed,
  updateNode as updateNodeAction
} from '../actions/nodeActions';
import { undoGraph } from '../api/graphs';
import { createNode, fetchNodes, updateNode } from '../api/nodes';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 500, { key: node => node.id });
const debouncedCreateNode = AwesomeDebouncePromise(createNode, 200);
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

  const onAddNode = React.useCallback(() => {
    const addNode2 = async () => {
      const node = await debouncedCreateNode(graphId);
      dispatch(addNode(node));
    };
    addNode2();
  }, [graphId]);

  const onUpdateNode = React.useCallback((node: Node) => {
    const updateNode2 = async () => {
      const updated = await debouncedUpdateNode(node);
      if (updated) {
        dispatch(updateNodeAction(node));
      }
    };
    updateNode2();
  }, []);

  const onUndo = React.useCallback(() => {
    const undo = async () => {
      await undoGraph(graphId);
      const result = await fetchNodes(graphId);
      console.log(result);
      dispatch(fetchNodesSucceed(result));
    };
    undo();
  }, [graphId]);

  return { state, onAddNode, onUpdateNode, onUndo };
}
