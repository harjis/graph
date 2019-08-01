// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Background from 'Graph/components/Background/Background';
import Canvas from 'Graph/components/Canvas/Canvas';
import ConnectEdge from '../ConnectEdge/ConnectEdge';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import InputNode from '../ConnectNodes/InputNode';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import type { Edge, Node } from '../../constants/ConnectGraphTypes';
import { getNode } from 'ConnectGraph/utils/nodeUtils';

import styles from './ConnectGraph.module.css';
import { getComponentByType } from '../../utils/nodeComponentUtil';

type Props = {|
  edges: Edge[],
  nodes: Node[],
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
                {props.edges.map(edge => (
                  <ConnectEdge
                    key={edge.id}
                    fromNode={getNode(props.nodes, edge.from_node_id)}
                    toNode={getNode(props.nodes, edge.to_node_id)}
                  />
                ))}
                {props.nodes.map(node => {
                  const NodeComponent = getComponentByType(node.type);
                  return (
                    <NodeComponent
                      id={node.id}
                      key={node.id}
                      name={node.name}
                      onClickFromConnector={() => console.log('implement me')}
                      onClickToConnector={() => console.log('implement me')}
                      onMouseDown={event => props.onStartDrag(node.id, event)}
                      onMouseUp={props.onStopDrag}
                      x={node.x}
                      y={node.y}
                    >
                      {null}
                    </NodeComponent>
                  );
                })}
              </React.Fragment>
            )}
          </Canvas>
        )}
      </SizeMe>
    </React.Fragment>
  </div>
);

export default ConnectGraph;
