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

  public async onEditorEval(code: string) {
    this.saveCodeToLocalStorage(code);
    await this.consoleRef.clean();
    await this.consoleRef.writeLine('input', '');
    await this.consoleRef.eval(code);
  }

  public getCodeFromLocalStorage() {
    return window.localStorage.getItem('code') || '';
  }

  public saveCodeToLocalStorage(code: string) {
    window.localStorage.setItem('code', code);
  }

  public render() {
    return (
      <div className="repl-container">
        <Editor
          code={this.getCodeFromLocalStorage()}
          onEval={this.onEditorEval}
        />
        <Console
          ref={ref => this.consoleRef = ref}
          onEval={this.evaluate}
        />
      </div>
    );
  }
}
