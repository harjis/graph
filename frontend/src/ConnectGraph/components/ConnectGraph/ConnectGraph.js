// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Canvas from 'Graph/components/Canvas/Canvas';
import CenteredText from 'Graph/components/NodeContent/CenteredText';
import Background from 'Graph/components/Background/Background';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import Node from 'Graph/components/Node/Node';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import { DEFAULT_NODE_HEIGHT, DEFAULT_NODE_WIDTH } from 'Graph/constants/GraphConstants';
import type { Node as NodeType } from '../../constants/ConnectGraphTypes';

import styles from './ConnectGraph.module.css';

type Props = {|
  nodes: NodeType[],
  onAddNode: () => any,
  onStartDrag: (nodeId: number, event: SyntheticMouseEvent<Element>) => any,
  onStopDrag: (event: SyntheticMouseEvent<Element>) => any,
  onUndo: () => any
|};
const ConnectGraph = (props: Props) => (
  <div className={styles.container}>
    <React.Fragment>
      <NodeActionBar onAddNode={props.onAddNode} onUndo={props.onUndo} />
      <SizeMe monitorHeight>
        {({ size }) => (
          <Canvas height={size.height} width={size.width}>
            {({ canvasId }) => (
              <React.Fragment>
                <defs>
                  <DotPattern patternId={canvasId} />
                </defs>
                <Background patternId={canvasId} height={size.height} width={size.width} />
                {props.nodes.map(node => (
                  <Node
                    height={DEFAULT_NODE_HEIGHT}
                    id={node.id}
                    key={node.id}
                    onMouseDown={event => props.onStartDrag(node.id, event)}
                    onMouseUp={props.onStopDrag}
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
    </React.Fragment>
  </div>
);

export default ConnectGraph;
