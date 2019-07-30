// @flow
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import reducer, { initialState } from './reducers/nodeReducer';
import {
  addNode,
  fetchNodesStart,
  fetchNodesSucceed,
  fetchNodesError
} from './actions/nodeActions';
import { createNode, fetchNodes, updateNode } from './api/nodes';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 500, { key: node => node.id });
const debouncedCreateNode = AwesomeDebouncePromise(createNode, 200);

const ConnectGraphContainerRouterContainer = (props: ContextRouter) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;
  return <ConnectGraphContainer graphId={Number(graphId)} />;
};

type ConnectGraphContainerProps = {|
  graphId: number
|};

function ConnectGraphContainer(props: ConnectGraphContainerProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    let didCancel = false;
    const fetchData = async () => {
      dispatch(fetchNodesStart());
      try {
        const result = await fetchNodes(props.graphId);
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
  }, [props.graphId]);

  const onAddNode = React.useCallback(() => {
    const addNode2 = async () => {
      const node = await debouncedCreateNode(props.graphId);
      dispatch(addNode(node));
    };
    addNode2();
  }, [props.graphId]);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.error) {
    return <div>Error :(</div>;
  }

  return (
    <ConnectGraph nodes={state.nodes} onAddNode={onAddNode} onUpdateNode={debouncedUpdateNode} />
  );
}

export default ConnectGraphContainerRouterContainer;
