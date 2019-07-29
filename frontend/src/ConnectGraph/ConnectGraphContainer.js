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
  const { nodes, isLoading, onStartDrag, onStopDrag } = useConnectGraph(props.graphId);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <ConnectGraph nodes={nodes} onStartDrag={onStartDrag} onStopDrag={onStopDrag} />;
}

export default ConnectGraphContainerRouterContainer;
