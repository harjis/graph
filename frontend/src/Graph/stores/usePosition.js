// @flow
import * as React from 'react';

type Node = {
  id: string,
  x: number,
  y: number
};
export default function usePosition() {
  const [nodes, setPosition] = React.useState([]);
  const updatePosition = (updatedNode: Node) => {
    if (nodes.find(node => node.id === updatedNode.id)) {
      return setPosition(
        nodes.map<Node>(node => {
          if (node.id === updatedNode.id) {
            return { ...node, x: updatedNode.x, y: updatedNode.y };
          } else {
            return node;
          }
        })
      );
    }
  };

  return { nodes, updatePosition };
}
