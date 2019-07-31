// @flow

type Coordinate = { x: number, y: number };
export const getOriginToOriginBezierPath = (from: Coordinate, to: Coordinate): string => {
  const middleY = from.y + (to.y - from.y) / 2;
  return `M${from.x},${from.y} C${from.x},${middleY} ${to.x},${middleY} ${to.x},${to.y}`;
};
