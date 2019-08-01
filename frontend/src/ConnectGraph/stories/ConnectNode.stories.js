// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Canvas from '../../Graph/components/Canvas/Canvas';
import InputNode from '../components/ConnectNodes/InputNode';

const CanvasDecorator = storyFn => (
  <Canvas height={500} width={500}>
    {() => storyFn()}
  </Canvas>
);
storiesOf('ConnectGraph/Nodes', module)
  .addDecorator(CanvasDecorator)
  .add('Input', () => (
    <InputNode name="Input 1" id={1} x={200} y={200}>
      {null}
    </InputNode>
  ));
