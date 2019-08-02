// @flow
export type CTM = {|
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
|};
export function getMousePosition(clientX: number, clientY: number, ctm: CTM) {
  return {
    x: (clientX - ctm.e) / ctm.a,
    y: (clientY - ctm.f) / ctm.d
  };
}
