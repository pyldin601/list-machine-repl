import * as React from 'react';
import makeEvaluator from '@peacefulbit/list-machine';
import { Console } from '../components';

export default class App extends React.Component<{}, {}> {
  private evaluate: (code: string) => any;

  constructor(props: {}) {
    super(props);
    this.evaluate = makeEvaluator();
  }

  public render() {
    return (
      <div className="repl-container">
        <Console onEval={this.evaluate}/>
      </div>
    );
  }
}
