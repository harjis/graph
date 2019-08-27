// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Background from 'Graph/components/Background/Background';
import Canvas from 'Graph/components/Canvas/Canvas';
import ConnectEdge from '../ConnectEdge/ConnectEdge';
import ConnectEdgeInProgress from '../ConnectEdge/ConnectEdgeInProgress';
import DotPattern from 'Graph/components/DotPattern/DotPattern';
import NodeActionBar from '../NodeActionBar/NodeActionBar';
import type { CTM } from '../../../utils/svg_utils';
import type { Edge, Errors, Node } from '../../constants/ConnectGraphTypes';
import { connectGraphNodeHeight } from '../../constants/ConnectGraphConstants';
import { getComponentByType } from '../../utils/nodeComponentUtil';
import { getMousePosition } from '../../../utils/svg_utils';
import { getNode } from 'ConnectGraph/utils/nodeUtils';
import { useConnectEdgeInProgress } from '../../stores/useConnectEdgeInProgress';

import styles from './ConnectGraph.module.css';

type Props = {|
  edges: Edge[],
  nodes: Node[],
  isSaving: boolean,
  onAddEdge: (fromNodeId: number, toNodeId: number) => any,
  onAddInputNode: () => any,
  onAddOutputNode: () => any,
  onDeleteEdge: (edge: Edge) => any,
  onStartDrag: (nodeId: number, event: SyntheticMouseEvent<Element>) => any,
  onStopDrag: (event: SyntheticMouseEvent<Element>) => any,
  onUndo: () => any,
  onResetDb: () => any,
  validationErrors: Errors
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
          isSaving={props.isSaving}
          onAddInputNode={props.onAddInputNode}
          onAddOutputNode={props.onAddOutputNode}
          onUndo={props.onUndo}
          onResetDb={props.onResetDb}
          validationErrors={props.validationErrors}
        />
        {/*.container + .innerContainer is a bit of a hack. Try to make it better*/}
        <div data-canvas-container className={styles.innerContainer}>
          <SizeMe monitorHeight>
            {({ size }) => (
              <Canvas
                ref={canvasRef}
                height={getMaxHeight(props.nodes, size.height)}
                width={size.width}
              >
                {({ canvasId }) => (
                  <React.Fragment>
                    <defs>
                      <DotPattern patternId={canvasId} />
                    </defs>
                    <Background
                      patternId={canvasId}
                      height={getMaxHeight(props.nodes, size.height)}
                      width={size.width}
                    />
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
        </div>
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

function getNodeMaxBottom(nodes: Node[]): number {
  if (nodes.length === 0) return 0;
  const maxY = Math.max(...nodes.map(node => node.y));
  return maxY + connectGraphNodeHeight + 16; // TODO gutter
}

function getMaxHeight(nodes: Node[], domHeight: number): number {
  return Math.max(domHeight, getNodeMaxBottom(nodes));
}

export default ConnectGraph;
