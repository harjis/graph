// @flow
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import { url } from 'ConnectGraph/api/common';
import { useFetch } from '../Generic/components/useFetch';
import { updateNode } from './api/nodes';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 500);

const ConnectGraphContainerRouterContainer = (props: ContextRouter) => {
  const graphId = props.match.params.id;
  if (!graphId) return <div>Graph ID is missing</div>;
  return <ConnectGraphContainer graphId={Number(graphId)} />;
};

type ConnectGraphContainerProps = {|
  graphId: number
|};

function ConnectGraphContainer(props: ConnectGraphContainerProps) {
  const [backendNodes, isLoading] = useFetch(`${url}/graphs/${props.graphId}/nodes`);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!backendNodes) {
    return <div>Error :(</div>;
  }

  return <ConnectGraph nodes={backendNodes} onUpdateNode={debouncedUpdateNode} />;
}

export default ConnectGraphContainerRouterContainer;
