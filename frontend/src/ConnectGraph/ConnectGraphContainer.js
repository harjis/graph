// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import useConnectGraph from './stores/useConnectGraph';

const ConnectGraphContainerRouterContainer = (props: ContextRouter) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;
  return <ConnectGraphContainer graphId={Number(graphId)} />;
};

type ConnectGraphContainerProps = {|
  graphId: number
|};
function ConnectGraphContainer(props: ConnectGraphContainerProps) {
  const { state, onAddNode, onUpdateNode } = useConnectGraph(props.graphId);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.error) {
    return <div>Error :(</div>;
  }

  return <ConnectGraph nodes={state.nodes} onAddNode={onAddNode} onUpdateNode={onUpdateNode} />;
}

export default ConnectGraphContainerRouterContainer;
