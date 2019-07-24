// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import FetchData from 'Generic/components/FetchData';
import { getGraphs } from 'ConnectGraph/api/graphs';

export default () => (
  <FetchData fetchOnlyOnMount query={getGraphs}>
    {({ data: graphs, error, isLoading }) => {
      if (error || isLoading) return null;
      if (!graphs) return null;
      return (
        <ul>
          {graphs.map(graph => (
            <li key={graph.id}>
              <Link to={`/graphs/${graph.id}`}>{graph.name}</Link>
            </li>
          ))}
        </ul>
      );
    }}
  </FetchData>
);
