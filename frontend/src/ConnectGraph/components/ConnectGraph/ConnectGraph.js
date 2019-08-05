// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Background from 'Graph/components/Background/Background';
import Canvas from 'Graph/components/Canvas/Canvas';
import ConnectEdge from '../ConnectEdge/ConnectEdge';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import type { Edge, Node } from '../../constants/ConnectGraphTypes';
import { getComponentByType } from '../../utils/nodeComponentUtil';
import { getNode } from 'ConnectGraph/utils/nodeUtils';

import styles from './ConnectGraph.module.css';
import { useConnectEdgeInProgress } from '../../stores/useConnectEdgeInProgress';
import ConnectEdgeInProgress from '../ConnectEdge/ConnectEdgeInProgress';
import { getMousePosition } from '../../../utils/svg_utils';
import type { CTM } from '../../../utils/svg_utils';

type Props = {|
  edges: Edge[],
  nodes: Node[],
  onAddEdge: (fromNodeId: number, toNodeId: number) => any,
  onAddInputNode: () => any,
  onAddOutputNode: () => any,
  onDeleteEdge: (edge: Edge) => any,
  onStartDrag: (nodeId: number, event: SyntheticMouseEvent<Element>) => any,
  onStopDrag: (event: SyntheticMouseEvent<Element>) => any,
  onUndo: () => any
|};
const ConnectGraph = (props: Props) => {
  const {
    edgeInProgressState,
    onStartEdgeInProgress,
    onStopEdgeInProgress
  } = useConnectEdgeInProgress();
  const canvasRef = React.createRef<Element>();
  return (
    <div className={styles.container}>
      <React.Fragment>
        <NodeActionBar
          onAddInputNode={props.onAddInputNode}
          onAddOutputNode={props.onAddOutputNode}
          onUndo={props.onUndo}
        />
        <SizeMe monitorHeight>
          {({ size }) => (
            <Canvas ref={canvasRef} height={size.height} width={size.width}>
              {({ canvasId }) => (
                <React.Fragment>
                  <defs>
                    <DotPattern patternId={canvasId} />
                  </defs>
                  <Background patternId={canvasId} height={size.height} width={size.width} />
                  {props.edges.map(edge => (
                    <ConnectEdge
                      key={edge.id}
                      onClick={() => props.onDeleteEdge(edge)}
                      fromNode={getNode(props.nodes, edge.from_node_id)}
                      toNode={getNode(props.nodes, edge.to_node_id)}
                    />
                  ))}
                  {props.nodes.map(node => {
                    const NodeComponent = getComponentByType(node.type);
                    return (
                      <NodeComponent
                        canConnect={!!edgeInProgressState.fromNodeId}
                        hasToEdges={node.to_edge_ids.length > 0}
                        id={node.id}
                        key={node.id}
                        name={node.name}
                        onClickFromConnector={event =>
                          onStartEdgeInProgress(node.id, event, canvasRef)
                        }
                        onClickToConnector={() => {
                          // TODO does this handle id 0?
                          if (edgeInProgressState.fromNodeId) {
                            props.onAddEdge(edgeInProgressState.fromNodeId, node.id);
                          }
                          onStopEdgeInProgress();
                        }}
                        onMouseDown={event => props.onStartDrag(node.id, event)}
                        onMouseUp={props.onStopDrag}
                        x={node.x}
                        y={node.y}
                      >
                        {null}
                      </NodeComponent>
                    );
                  })}
                  {getEdgeInProgress(
                    props.nodes,
                    edgeInProgressState.fromNodeId,
                    edgeInProgressState.clientX,
                    edgeInProgressState.clientY,
                    edgeInProgressState.ctm
                  )}
                </React.Fragment>
              )}
            </Canvas>
          )}
        </SizeMe>
      </React.Fragment>
    </div>
  );
};

function getEdgeInProgress(
  nodes: Node[],
  fromNodeId: ?number,
  clientX: number,
  clientY: number,
  ctm: ?CTM
) {
  if (fromNodeId === null || fromNodeId === undefined || !ctm) return null;
  const toCoordinates = getMousePosition(clientX, clientY, ctm);
  return (
    <ConnectEdgeInProgress fromNode={getNode(nodes, fromNodeId)} toCoordinates={toCoordinates} />
  );
}

export default ConnectGraph;
