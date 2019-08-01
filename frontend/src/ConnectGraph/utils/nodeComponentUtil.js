// @flow
import * as React from 'react';

import InputNode from '../components/ConnectNodes/InputNode';
import OutputNode from '../components/ConnectNodes/OutputNode';
import type { NodeType } from '../constants/ConnectGraphTypes';

type NodeComponent = typeof InputNode | typeof OutputNode;
const componentMap: Map<NodeType, NodeComponent> = new Map([
  ['InputNode', InputNode],
  ['OutputNode', OutputNode]
]);
export function getComponentByType(type: NodeType): NodeComponent {
  const component = componentMap.get(type);
  if (!component) throw Error('Tried to create unsupported node component:' + type);
  return component;
}
