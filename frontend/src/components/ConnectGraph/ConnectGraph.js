// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Canvas from 'graph/components/Canvas/Canvas';
import DotPattern from 'graph/components/DotPattern/DotPattern';

import styles from './ConnectGraph.module.css';

type Props = {||};
export default (props: Props) => (
  <div className={styles.container}>
    <SizeMe monitorHeight>
      {({ size }) => (
        <Canvas height={size.height} width={size.width}>
          <defs>
            <DotPattern />
          </defs>
          <rect x="0" y="0" width="200" height="400" fill="red" />
        </Canvas>
      )}
    </SizeMe>
  </div>
);
