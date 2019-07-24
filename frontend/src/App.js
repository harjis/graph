// @flow
import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from 'Home/Home';
import GraphsMenu from 'ConnectGraph/components/GraphsMenu/GraphsMenu';
import ConnectGraphContainer from 'ConnectGraph/ConnectGraphContainer';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            Graphs
            <GraphsMenu />
          </li>
        </ul>
      </div>
      <hr />
      <Route exact path="/" component={Home} />
      <Route path="/graphs/:id" component={ConnectGraphContainer} />
    </Router>
  );
}
