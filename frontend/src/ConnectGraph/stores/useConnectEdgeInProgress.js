// @flow
import * as React from 'react';

type CTM = {|
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
|};
type OnDragHandler = (event: SyntheticMouseEvent<Element>) => void;
type State = {|
  ctm: ?CTM,
  fromNodeId: ?number,
  clientX: number,
  clientY: number
|};
const initialState = {
  fromNodeId: null,
  ctm: null,
  clientX: 0,
  clientY: 0
};
export function useConnectEdgeInProgress() {
  const [edgeInProgressState, setState] = React.useState<State>(initialState);

  const someFun = (event: MouseEvent) => {
    if (event.target instanceof Element && !event.target.getAttribute('data-connector-type')) {
      onStopEdgeInProgress();
      return;
    }
  };
  const onMove = React.useRef<OnDragHandler>((event: SyntheticMouseEvent<Element>) => {
    setState(state => {
      const { clientX, clientY } = event;
      return { ...state, clientX, clientY };
    });
  });

  const onStartEdgeInProgress = (
    fromNodeId: number,
    event: SyntheticMouseEvent<Element>,
    svg: {| current: ?Element |}
  ) => {
    if (!svg.current) return;
    // $FlowFixMe not true!
    const ctm = svg.current.getScreenCTM();
    const { clientX, clientY } = event;
    setState(state => ({
      ...state,
      ctm,
      fromNodeId,
      clientX,
      clientY
    }));
    window.addEventListener('mousemove', onMove.current);
    window.addEventListener('mouseup', someFun);
  };

  const onStopEdgeInProgress = () => {
    window.removeEventListener('mousemove', onMove.current);
    window.removeEventListener('mouseup', someFun);
    setState(() => initialState);
  };
  return { edgeInProgressState, onStartEdgeInProgress, onStopEdgeInProgress };
}
