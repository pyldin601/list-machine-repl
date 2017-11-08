import { toArray } from 'lodash';
import * as React from 'react';
import { Env, evaluate, valueOf, tokenize, parse } from '@peacefulbit/list-machine';
import { Console, Editor } from '../components';

export default class App extends React.Component<{}, {}> {
  private consoleRef: Console;
  private env: Env;
  private evaluate: (code: string) => any;

  constructor(props: {}) {
    super(props);

    this.env = new Env();
    this.evaluate = (code: string) => evaluate(code, this.env);

    this.onEditorEval = this.onEditorEval.bind(this);
    this.onEditorTokenize = this.onEditorTokenize.bind(this);
    this.onEditorParse = this.onEditorParse.bind(this);

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
    await this.consoleRef.eval(code);
  }

  public async onEditorTokenize(code: string) {
    await this.consoleRef.clean();
    try {
      const tokensStream = tokenize(code);
      await this.consoleRef.writeLine('output', JSON.stringify(toArray(tokensStream), null, 2));
    } catch (e) {
      await this.consoleRef.writeLine('error', e.message);
    }
  }

  public async onEditorParse(code: string) {
    await this.consoleRef.clean();
    try {
      await this.consoleRef.writeLine('output', JSON.stringify(parse(code), null, 2));
    } catch (e) {
      await this.consoleRef.writeLine('error', e.message);
    }
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
          onTokenize={this.onEditorTokenize}
          onParse={this.onEditorParse}
          onEval={this.onEditorEval}
          onChange={this.onCodeUpdate}
        />
        <Console
          ref={ref => this.consoleRef = ref}
          onEval={(code) => valueOf(this.evaluate(code))}
        />
      </div>
    );
  }
}
