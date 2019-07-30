// @flow
import * as React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import reducer, { initialState } from '../reducers/nodeReducer';
import {
  addNode,
  dragNode,
  fetchNodesError,
  fetchNodesStart,
  fetchNodesSucceed,
  startNodeDrag,
  stopNodeDrag
} from '../actions/nodeActions';
import { undoGraph } from '../api/graphs';
import { createNode, fetchNodes } from '../api/nodes';

type OnDragHandler = (event: MouseEvent) => void;

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

  const onUndo = React.useCallback(() => {
    const undo = async () => {
      await undoGraph(graphId);
      const result = await fetchNodes(graphId);
      console.log(result);
      dispatch(fetchNodesSucceed(result));
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

  const onStopDrag = () => {
    window.removeEventListener('mousemove', onDrag.current);
    dispatch(stopNodeDrag());
  };

  return { state, onAddNode, onUndo, onStartDrag, onStopDrag };
}
