// @flow

const handlers = {
  onMouseDown: () => {},
  onMouseUp: () => {}
};
export const inputHandlers = { ...handlers, onClickFromConnector: () => {} };
export const outputHandlers = { ...handlers, onClickToConnector: () => {} };

