// @flow
import * as React from 'react';

import styles from './NodeActionBar.module.css';

type Props = {|
  onAddNode: () => any
|};
const NodeActionBar = (props: Props) => (
  <div className={styles.container}>
    <button onClick={props.onAddNode}>Add node</button>
    <button>Undo</button>
  </div>
);

export default NodeActionBar;
