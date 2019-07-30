// @flow
import * as React from 'react';
import shortid from 'shortid';

import styles from './Canvas.module.css';

type ChildrenProps = {|
  canvasId: string
|};
type Props = {|
  children: (props: ChildrenProps) => ?React.Node,
  height: number,
  onMouseUp: () => void,
  width: number
|};

const Canvas = (props: Props) => {
  const [canvasId] = React.useState(shortid.generate());
  return (
    <svg
      onMouseUp={props.onMouseUp}
      className={styles.container}
      height={props.height}
      width={props.width}
    >
      {props.children({ canvasId })}
    </svg>
  );
};

export default Canvas;
