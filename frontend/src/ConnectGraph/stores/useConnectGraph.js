// @flow
import useNodes from 'Graph/stores/useNodes';
import { url } from 'ConnectGraph/api/common';
import { useFetch } from 'Generic/components/useFetch';
import { updateNode } from '../api/nodes';
import AwesomeDebouncePromise from 'awesome-debounce-promise';

const debouncedUpdateNode = AwesomeDebouncePromise(updateNode, 500, { key: node => node.id });
export default function useConnectGraph(graphId: number) {
  const [backendNodes, isLoading] = useFetch(`${url}/graphs/${graphId}/nodes`);
  const { state, onStartDrag, onStopDrag } = useNodes(backendNodes, debouncedUpdateNode);

  return { nodes: state.nodes, onStartDrag, onStopDrag, isLoading };
}
