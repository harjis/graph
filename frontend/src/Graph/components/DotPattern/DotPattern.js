// @flow
import * as React from 'react';

import { GRID_SHIFT, GRID_SIZE } from '../../constants/GraphConstants';

type Props = {|
  patternId: string
|};
const DotPatters = (props: Props) => (
  <pattern id={props.patternId} patternUnits="userSpaceOnUse" width={GRID_SIZE} height={GRID_SIZE}>
    <rect width="1" height="1" fill="#777" x={GRID_SHIFT} y={GRID_SHIFT} />
  </pattern>
);

export default DotPatters;
