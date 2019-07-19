// @flow
import * as React from "react";

import Canvas from 'graph/components/Canvas/Canvas';

export default () => (
  <Canvas height={100} width={500}>
    <rect x="10" y="10" width="200" height="400" fill="red" />
  </Canvas>
);
