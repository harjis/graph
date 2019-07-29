// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Canvas from 'Graph/components/Canvas/Canvas';
import CenteredText from 'Graph/components/NodeContent/CenteredText';
import Background from 'Graph/components/Background/Background';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import Node from 'Graph/components/Node/Node';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from 'Graph/constants/GraphConstants';
import type { Node as NodeType } from '../../constants/ConnectGraphTypes';

import styles from './ConnectGraph.module.css';

type Props = {|
  nodes: NodeType[],
  onStartDrag: Function,
  onStopDrag: Function
|};
const ConnectGraph = (props: Props) => (
  <div className={styles.container}>
    <SizeMe monitorHeight>
      {({ size }) => (
        <Canvas onMouseUp={() => {
          console.log('canas');
          props.onStopDrag();
        }} height={size.height} width={size.width}>
          {({ canvasId }) => (
            <React.Fragment>
              <defs>
                <DotPattern patternId={canvasId} />
              </defs>
              <Background patternId={canvasId} height={size.height} width={size.width} />
              {props.nodes.map((node, index) => (
                <Node
                  height={DEFAULT_NODE_HEIGHT}
                  id={index}
                  key={index}
                  onMouseDown={event => props.onStartDrag(node.id, event)}

                  width={DEFAULT_NODE_WIDTH}
                  x={node.x}
                  y={node.y}
                >
                  <CenteredText nodeWidth={DEFAULT_NODE_WIDTH} nodeHeight={DEFAULT_NODE_HEIGHT}>
                    {node.name}
                  </CenteredText>
                </Node>
              ))}
            </React.Fragment>
          )}
        </Canvas>
      )}
    </SizeMe>
  </div>
);

export default ConnectGraph;
