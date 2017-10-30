import * as React from 'react';

interface ILogItem {
  type: 'input' | 'output' | 'error',
  content: string,
}

// interface IConsole {
//   log: ILogItem[],
//   onLine: (content: string) => boolean,
// }

interface IConsoleState {
  input: string,
  cursorPosition: number,
  log: ILogItem[],
}

export default class Console extends React.Component<{}, IConsoleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      input: '',
      cursorPosition: Infinity,
      log: [],
    };
  }

  public render() {
    return (
      <div className="console">
      </div>
    );
  }
};
