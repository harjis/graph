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
  width: number
|};

// I have no idea what the _ is but I copied it from react_16_3/forwardRef.js ^_^
// eslint-disable-next-line react/display-name
const Canvas = React.forwardRef<Props, _>((props: Props, ref) => {
  const [canvasId] = React.useState(shortid.generate());
  return (
    <svg ref={ref} className={styles.container} height={props.height} width={props.width}>
      {props.children({ canvasId })}
    </svg>
  );
});

export default Canvas;
