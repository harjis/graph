// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import useConnectGraph from './stores/useConnectGraph';

const ConnectGraphContainerRouterContainer = (props: ContextRouter) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;
  return <ConnectGraphContainer graphId={graphId} />;
};

type ConnectGraphContainerProps = {|
  graphId: string
|};
function ConnectGraphContainer(props: ConnectGraphContainerProps) {
  const {
    state,
    onAddInputNode,
    onAddOutputNode,
    onStartDrag,
    onStopDrag,
    onAddEdge,
    onDeleteEdge,
    onResetDb,
    onSaveAll
  } = useConnectGraph(props.graphId);

  if (state.nodes.isLoading || state.edges.isLoading) {
    return <div>Loading...</div>;
  }
  if (state.nodes.error || state.edges.error) {
    return <div>Error :(</div>;
  }

  return (
    <ConnectGraph
      isSaving={state.isSaving}
      edges={state.edges.edges}
      nodes={state.nodes.nodes}
      onAddEdge={onAddEdge}
      onAddInputNode={onAddInputNode}
      onAddOutputNode={onAddOutputNode}
      onDeleteEdge={onDeleteEdge}
      onStartDrag={onStartDrag}
      onStopDrag={onStopDrag}
      onSaveAll={onSaveAll}
      onResetDb={onResetDb}
      validationErrors={state.nodes.validationErrors}
    />
  );
}

export default ConnectGraphContainerRouterContainer;
