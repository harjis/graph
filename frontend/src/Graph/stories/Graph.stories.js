// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Canvas from '../components/Canvas/Canvas';
import DotPattern from '../components/DotPattern/DotPattern';
import Background from '../components/Background/Background';
import Node from '../components/Node/Node';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from '../constants/GraphConstants';

const size = {
  height: 500,
  width: 500
};
const styles = {
  height: '100%',
  width: '100%'
};
const nodes = [{ x: 10, y: 10 }, { x: 100, y: 100 }];
const Graph = () => (
  <div styles={styles}>
    <Canvas height={size.height} width={size.width}>
      {({ canvasId }) => (
        <React.Fragment>
          <defs>
            <DotPattern patternId={canvasId} />
          </defs>
          <Background patternId={canvasId} height={size.height} width={size.width} />
          {nodes.map(node => (
            <Node height={DEFAULT_NODE_HEIGHT} width={DEFAULT_NODE_WIDTH} x={node.x} y={node.y}>
              Node!
            </Node>
          ))}
        </React.Fragment>
      )}
    </Canvas>
  </div>
);

storiesOf('Graph', module).add('Basic', () => <Graph />);
