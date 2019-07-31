// @flow
import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Canvas from 'Graph/components/Canvas/Canvas';
import Edge from 'Graph/components/Edge/Edge';

import styles from './CustomStyles.module.css';

const circle = { x: 10, y: 10 };
const circle2 = { x: 100, y: 100 };
const GraphWithEdge = (props: {| customColors?: boolean |}) => (
  <Canvas height={500} width={500}>
    {() => (
      <React.Fragment>
        <circle fill="lightblue" r="5" cx={circle.x} cy={circle.y} />
        <circle fill="lightblue" r="5" cx={circle2.x} cy={circle2.y} />
        <Edge
          from={circle}
          to={circle2}
          styles={props.customColors ? styles.customEdge : undefined}
        />
      </React.Fragment>
    )}
  </Canvas>
);
storiesOf('Graph/Edge', module)
  .add('Default', () => <GraphWithEdge />)
  .add('With custom colors', () => <GraphWithEdge customColors />);
