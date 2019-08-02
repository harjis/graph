// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Canvas from '../../Graph/components/Canvas/Canvas';
import ConnectEdge from '../components/ConnectEdge/ConnectEdge';
import InputNode from '../components/ConnectNodes/InputNode';
import OutputNode from '../components/ConnectNodes/OutputNode';
import { createNode, inputHandlers, outputHandlers } from './story_utils';

const CanvasDecorator = storyFn => (
  <Canvas height={500} width={500}>
    {() => storyFn()}
  </Canvas>
);

const fromNode = createNode(0, 10, 10);
const toNode = createNode(0, 200, 200);
const WithNodes = () => (
  <React.Fragment>
    <InputNode
      name={fromNode.name}
      id={fromNode.id}
      x={fromNode.x}
      y={fromNode.y}
      {...inputHandlers}
    >
      {null}
    </InputNode>
    <OutputNode
      canConnect={false}
      hasToEdges={true}
      name={toNode.name}
      id={toNode.id}
      x={toNode.x}
      y={toNode.y}
      {...outputHandlers}
    >
      {null}
    </OutputNode>
    <ConnectEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />
  </React.Fragment>
);
storiesOf('ConnectGraph/Edges', module)
  .addDecorator(CanvasDecorator)
  .add('Default', () => <ConnectEdge onClick={() => {}} fromNode={fromNode} toNode={toNode} />)
  .add('With Nodes', () => <WithNodes />);
