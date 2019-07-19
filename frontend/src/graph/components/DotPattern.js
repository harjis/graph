// @flow
import { GRID_SHIFT, GRID_SIZE } from "../constants/GraphConstants";

import * as React from "react";

export default () => (
  <pattern id="grid" patternUnits="userSpaceOnUse" width={GRID_SIZE} height={GRID_SIZE}>
    <rect width="1" height="1" fill="#777" x={GRID_SHIFT} y={GRID_SHIFT} />
  </pattern>
);
