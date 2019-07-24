// @flow
import * as React from 'react';
import type { ContextRouter } from 'react-router-dom';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';

export default (props: ContextRouter) => {
  return <ConnectGraph nodes={[]} />;
};
