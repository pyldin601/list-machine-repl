import * as React from 'react';
import * as CodeMirror from 'react-codemirror';

require('codemirror/mode/commonlisp/commonlisp');

interface IConsoleProps {
  onEval: (content: string) => any,
}

interface IConsoleState {
  code: string,
}

const options = {
  mode: 'commonlisp',
  theme: 'material',
};

export default class Editor extends React.Component<IConsoleProps, IConsoleState> {
  constructor(props: IConsoleProps) {
    super(props);

    this.state = {
      code: '',
    };

    this.onUpdateCode = this.onUpdateCode.bind(this);
  }

  public onUpdateCode(code: string) {
    this.setState({ code });
  }

  public render() {
    return (
      <div className="editor">
        <CodeMirror
          value={this.state.code}
          onChange={this.onUpdateCode}
          options={options}
        />
      </div>
    )
  }
};
