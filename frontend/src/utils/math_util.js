// @flow

export function getRandomInt(min: number = 0, max: number = 999999999): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
