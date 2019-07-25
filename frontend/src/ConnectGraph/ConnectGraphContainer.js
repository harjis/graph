// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import { useFetch } from 'Generic/components/useFetch';
import { url } from './api/common';
import useNodes from '../Graph/stores/useNodes';

export default (props: ContextRouter) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;

  const [backendNodes, isLoading] = useFetch(`${url}/graphs/${graphId}/nodes`);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!backendNodes) {
    return <div>Error! :(</div>;
  }

  if (backendNodes.length === 0) {
    return null;
  }

  return <Wrapper nodes={backendNodes} />;
};

type WrapperProps = {|
  nodes: any[]
|};

function Wrapper(props: WrapperProps) {
  const { state, onStartDrag, onStopDrag } = useNodes(props.nodes);
  return <ConnectGraph nodes={state.nodes} onStartDrag={onStartDrag} onStopDrag={onStopDrag} />;
}
