import ComandOption from './CommandParameter';

export default class CommandParser {
  private _commandParameters: ComandOption[];

  constructor() {
    this._commandParameters = [];
  }

  option(optionName: string) {
    const commandOption = new ComandOption(optionName);
    this._commandParameters.push(commandOption);
    return commandOption;
  }
}
