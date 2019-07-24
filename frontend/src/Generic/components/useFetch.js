// @flow
import * as React from 'react';

type Return<T> = [?T, boolean];
export function useFetch<T>(url: string): Return<T> {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }

  React.useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}
