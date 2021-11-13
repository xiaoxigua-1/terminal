import ComandOption from './CommandParameter';

export default class CommandParser {
  private _commandOptions: ComandOption[];

  private _args: string[];

  constructor(args: string[]) {
    this._commandOptions = [];
    this._args = args;
  }

  option(optionName: string) {
    const commandOption = new ComandOption(optionName);
    commandOption.args = this._args;
    this._commandOptions.push(commandOption);
    return commandOption;
  }
}
