// @flow

type Offset = {|
  x: number,
  y: number
|};
export function getMouseOffsetRelativeToElement(event: SyntheticMouseEvent<*>): Offset {
  const element = event.currentTarget;
  const bbox = element.getBoundingClientRect();
  const x = event.clientX - bbox.left;
  const y = event.clientY - bbox.top;
  return { x, y };
}
