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
import type { Node as GenericNode } from '../../../Graph/stores/useNode';

import styles from './ConnectGraph.module.css';

type Props = {|
  nodes: NodeType[],
  onAddNode: () => any,
  onUpdateNode: (node: NodeType) => any
|};
const ConnectGraph = (props: Props) => (
  <div className={styles.container}>
    <React.Fragment>
      <NodeActionBar onAddNode={props.onAddNode} />
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
                    id={index}
                    key={index}
                    onUpdateNode={(genericNode: GenericNode) =>
                      props.onUpdateNode({ ...node, ...genericNode })
                    }
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
