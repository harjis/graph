// @flow
import * as React from 'react';

type State<T> = {|
  data: ?T,
  error: ?string,
  isLoading: boolean,
|};
type ChildrenProps<T> = {|
  ...State<T>,
  refetch: () => void,
|};
type Props<T> = {|
  children: (childrenProps: ChildrenProps<T>) => React.Node,
  fetchOnlyOnMount: boolean,
  query: () => Promise<T>,
|};
export default class FetchData<T> extends React.Component<Props<T>, State<T>> {
  static defaultProps = {
    fetchOnlyOnMount: false,
  };
  // State<T> needs to be explicitly defined. Otherwise errors
  state: State<T> = {
    data: null,
    error: null,
    isLoading: true,
  };

  componentWillMount(): void {
    this.fetchData(this.props.query);
  }

  componentWillReceiveProps(nextProps: Props<T>): void {
    !this.props.fetchOnlyOnMount && this.fetchData(nextProps.query);
  }

  fetchData(query: $PropertyType<Props<T>, 'query'>) {
    this.setState({ isLoading: true, error: null });
    query()
      .then(response => this.setState({ data: response, error: null, isLoading: false }))
      .catch(error => this.setState({ isLoading: false, error: error }));
  }

  refetch = () => {
    this.fetchData(this.props.query);
  };

  render(): React.Node {
    return this.props.children({ ...this.state, refetch: this.refetch });
  }
}
