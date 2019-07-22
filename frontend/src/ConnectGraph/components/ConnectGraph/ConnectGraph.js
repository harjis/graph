// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Canvas from 'Graph/components/Canvas/Canvas';
import Background from 'Graph/components/Background/Background';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import Node from 'Graph/components/Node/Node';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from 'Graph/constants/GraphConstants';
import type { Node as NodeType } from '../../constants/ConnectGraphTypes';

import styles from './ConnectGraph.module.css';

type Props = {|
  nodes: NodeType[]
|};
export default (props: Props) => (
  <div className={styles.container}>
    <SizeMe monitorHeight>
      {({ size }) => (
        <Canvas height={size.height} width={size.width}>
          {({ canvasId }) => (
            <React.Fragment>
              <defs>
                <DotPattern patternId={canvasId} />
              </defs>
              <Background patternId={canvasId} height={size.height} width={size.width} />
              {props.nodes.map((node, index) => (
                <Node
                  height={DEFAULT_NODE_HEIGHT}
                  id={index.toString()}
                  key={index}
                  width={DEFAULT_NODE_WIDTH}
                  x={node.x}
                  y={node.y}
                >
                  Node!
                </Node>
              ))}
            </React.Fragment>
          )}
        </Canvas>
      )}
    </SizeMe>
  </div>
);
