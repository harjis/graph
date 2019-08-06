// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Background from '../components/Background/Background';
import BottomLeftText from '../components/NodeContent/BottomLeftText';
import Canvas from '../components/Canvas/Canvas';
import CenteredText from '../components/NodeContent/CenteredText';
import DotPattern from '../components/DotPattern/DotPattern';
import Node from '../components/Node/Node';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from '../constants/GraphConstants';

import styles from './CustomStyles.module.css';

const size = {
  height: 500,
  width: 500
};
const initialNodes = [{ id: 1, x: 10, y: 10 }, { id: 2, x: 100, y: 100 }];
type Props = {
  customNodeStyles?: string
};

const Graph = (props: Props) => {
  return (
    <div>
      <Canvas height={size.height} width={size.width}>
        {({ canvasId }) => (
          <React.Fragment>
            <defs>
              <DotPattern patternId={canvasId} />
            </defs>
            <Background patternId={canvasId} height={size.height} width={size.width} />
            {initialNodes.map(node => (
              <Node
                height={DEFAULT_NODE_HEIGHT}
                id={node.id}
                key={node.id}
                styles={props.customNodeStyles}
                width={DEFAULT_NODE_WIDTH}
                x={node.x}
                y={node.y}
              >
                <CenteredText nodeHeight={DEFAULT_NODE_HEIGHT} nodeWidth={DEFAULT_NODE_WIDTH}>
                  Node!
                </CenteredText>
              </Node>
            ))}
          </React.Fragment>
        )}
      </Canvas>
    </div>
  );
};

const GraphWithBottomText = () => {
  return (
    <div>
      <Canvas height={size.height} width={size.width}>
        {({ canvasId }) => (
          <React.Fragment>
            {initialNodes.map(node => (
              <Node
                height={DEFAULT_NODE_HEIGHT}
                id={node.id}
                key={node.id}
                width={DEFAULT_NODE_WIDTH}
                x={node.x}
                y={node.y}
              >
                <CenteredText nodeHeight={DEFAULT_NODE_HEIGHT} nodeWidth={DEFAULT_NODE_WIDTH}>
                  Node!
                </CenteredText>
                <BottomLeftText nodeHeight={DEFAULT_NODE_HEIGHT} nodeWidth={DEFAULT_NODE_WIDTH}>
                  Bottom left text
                </BottomLeftText>
              </Node>
            ))}
          </React.Fragment>
        )}
      </Canvas>
    </div>
  );
};

storiesOf('Graph/Nodes', module)
  .add('Default', () => <Graph />)
  .add('With custom node styles', () => <Graph customNodeStyles={styles.customNode} />)
  .add('With bottom left text', () => <GraphWithBottomText customNodeStyles={styles.customNode} />);
