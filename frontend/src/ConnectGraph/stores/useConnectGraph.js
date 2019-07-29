// @flow
import { useFetch } from 'Generic/components/useFetch';
import { url } from 'ConnectGraph/api/common';
import useNodes from '../../Graph/stores/useNodes';

export default function useConnectGraph(graphId: number) {
  const [backendNodes, isLoading] = useFetch(`${url}/graphs/${graphId}/nodes`);
  const { state, onStartDrag, onStopDrag } = useNodes(backendNodes);

  return { nodes: state.nodes, onStartDrag, onStopDrag, isLoading };
}
