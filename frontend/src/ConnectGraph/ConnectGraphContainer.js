// @flow
import * as React from 'react';

import ConnectGraph from './components/ConnectGraph/ConnectGraph';

const nodes = [{ x: 10, y: 10 }, { x: 100, y: 100 }];
export default () => <ConnectGraph nodes={nodes} />;
