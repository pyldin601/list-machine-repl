import * as React from 'react';
import evaluate from '@peacefulbit/list-machine';
import { Console } from '../components';

export default class App extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div className="repl-container">
        <Console onEval={evaluate}/>
      </div>
    );
  }
}
