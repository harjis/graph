// @flow
import * as React from 'react';

import styles from './NodeActionBar.module.css';

type Props = {|
  onAddNode: () => any,
  onUndo: () => any
|};
const NodeActionBar = (props: Props) => (
  <div className={styles.container}>
    <button onClick={props.onAddNode}>Add node</button>
    <button onClick={props.onUndo}>Undo</button>
  </div>
);

export default NodeActionBar;
