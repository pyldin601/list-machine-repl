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
    this.onCodeUpdate = this.onCodeUpdate.bind(this);
  }

  public getCode() {
    const hash = window.location.hash;
    if (!hash) {
      return this.getCodeFromLocalStorage();
    }
    return decodeURIComponent(hash.slice(1));
  }

  public async onEditorEval(code: string) {
    await this.consoleRef.clean();
    await this.consoleRef.writeLine('input', '');
    await this.consoleRef.eval(code);
  }

  public onCodeUpdate(code: string) {
    this.saveCodeToLocalStorage(code);
    window.location.hash = encodeURIComponent(code);
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
          code={this.getCode()}
          onEval={this.onEditorEval}
          onChange={this.onCodeUpdate}
        />
        <Console
          ref={ref => this.consoleRef = ref}
          onEval={this.evaluate}
        />
      </div>
    );
  }
}
