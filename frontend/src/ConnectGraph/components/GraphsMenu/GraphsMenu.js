// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

import FetchData from 'Generic/components/FetchData';
import { fetchGraphs } from 'ConnectGraph/api/graphs';

const GraphsMenu = () => (
  <FetchData fetchOnlyOnMount query={fetchGraphs}>
    {({ data: graphs, error, isLoading }) => {
      if (isLoading) {
        return 'Loading...';
      }
      if (error) {
        return <div>{error}</div>;
      }
      if (!graphs) {
        return <div>Something went wrong :(</div>;
      }
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

export default GraphsMenu;
