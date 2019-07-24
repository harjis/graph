// @flow

const url = "http://localhost:3000";

type Graph = {|
  id: number,
  name: string,
  created_at: string,
  updated_at: string
|};
export function getGraphs(): Promise<Graph[]> {
  return fetch(`${url}/graphs`).then(resp => resp.json());
}
