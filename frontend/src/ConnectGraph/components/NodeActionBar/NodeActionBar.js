// @flow
import * as React from 'react';

import styles from './NodeActionBar.module.css';

type Props = {|
  onAddInputNode: () => any,
  onAddOutputNode: () => any,
  onUndo: () => any
|};
const NodeActionBar = (props: Props) => (
  <div className={styles.container}>
    <button onClick={props.onAddInputNode}>Add Input Node</button>
    <button onClick={props.onAddOutputNode}>Add Output Node</button>
    <button onClick={props.onUndo}>Undo</button>
  </div>
);

export default NodeActionBar;
