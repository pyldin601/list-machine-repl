import * as React from 'react';
import { Console } from '../components';

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return <Console />;
  }
}
