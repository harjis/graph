// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';
import { useFetch } from 'Generic/components/useFetch';

export default (props: ContextRouter) => {
  if (!props.match.params.id) return <div>Graph ID is missing</div>;
  const graphId = props.match.params.id;
  const [nodes, isLoading] = useFetch(`http://localhost:3000/graphs/${graphId}/nodes`);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!nodes) {
    return <div>Error! :(</div>;
  }

  return <ConnectGraph nodes={nodes} />;
};
