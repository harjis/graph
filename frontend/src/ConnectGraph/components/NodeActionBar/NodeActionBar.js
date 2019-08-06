// @flow
import * as React from 'react';

import styles from './NodeActionBar.module.css';
import type { Errors } from "../../constants/ConnectGraphTypes";

type Props = {|
  onAddInputNode: () => any,
  onAddOutputNode: () => any,
  onUndo: () => any,
  validationErrors: Errors
|};
const NodeActionBar = (props: Props) => (
  <div className={styles.container}>
    <button onClick={props.onAddInputNode}>Add Input Node</button>
    <button onClick={props.onAddOutputNode}>Add Output Node</button>
    <button onClick={props.onUndo}>Undo</button>
    <div style={{ color: 'red' }}>{Object.values(props.validationErrors).join(' ')}</div>
  </div>
);

export default React.memo<Props>(NodeActionBar);
