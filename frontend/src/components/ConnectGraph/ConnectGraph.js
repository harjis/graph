// @flow
import * as React from 'react';
import { SizeMe } from 'react-sizeme';

import Canvas from 'graph/components/Canvas/Canvas';
import Background from 'graph/components/Background/Background';
import DotPattern from 'graph/components/DotPattern/DotPattern';

import styles from './ConnectGraph.module.css';

type Props = {||};
export default (props: Props) => (
  <div className={styles.container}>
    <SizeMe monitorHeight>
      {({ size }) => (
        <Canvas height={size.height} width={size.width}>
          {({ canvasId }) => (
            <React.Fragment>
              <defs>
                <DotPattern patternId={canvasId} />
              </defs>
              <Background patternId={canvasId} height={size.height} width={size.width} />
            </React.Fragment>
          )}
        </Canvas>
      )}
    </SizeMe>
  </div>
);
