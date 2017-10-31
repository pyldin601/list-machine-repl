import * as React from 'react';
import makeEvaluator from '@peacefulbit/list-machine';
import { Console, Editor } from '../components';

export default class App extends React.Component<{}, {}> {
  private evaluate: (code: string) => any;
  private consoleRef: Console;

  constructor(props: {}) {
    super(props);

    this.evaluate = makeEvaluator();

    this.onEditorEval = this.onEditorEval.bind(this);
  }

  public onEditorEval(code: string) {
    return this.consoleRef.eval(code);
  }

  public render() {
    return (
      <div className="repl-container">
        <Editor onEval={this.onEditorEval} />
        <Console
          ref={ref => this.consoleRef = ref}
          onEval={this.evaluate}
        />
      </div>
    );
  }
}
