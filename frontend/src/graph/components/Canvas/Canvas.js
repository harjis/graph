// @flow
import * as React from 'react';

import styles from './Canvas.module.css';

type Props = {|
  children: ?React.Node,
  height: number,
  width: number
|};
export default (props: Props) => (
  <svg className={styles.container} height={props.height} width={props.width}>
    {props.children}
  </svg>
);
