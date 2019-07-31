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
  const { state, onAddNode, onUndo, onStartDrag, onStopDrag } = useConnectGraph(props.graphId);

  if (state.nodes.isLoading || state.edges.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.nodes.error || state.edges.error) {
    return <div>Error :(</div>;
  }

  return (
    <ConnectGraph
      edges={state.edges.edges}
      nodes={state.nodes.nodes}
      onAddNode={onAddNode}
      onStartDrag={onStartDrag}
      onStopDrag={onStopDrag}
      onUndo={onUndo}
    />
  );
}

export default ConnectGraphContainerRouterContainer;
