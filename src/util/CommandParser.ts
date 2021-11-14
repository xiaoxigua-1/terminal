import ComandOption from './CommandOption';

export default class CommandParser {
  private _commandOptions: ComandOption[];

  private _args: string[] = [];

  constructor() {
    this._commandOptions = [];
  }

  option(optionName: string) {
    const commandOption = new ComandOption(optionName);
    const touchs = commandOption.touch;
    const values: string[] = [];

    const dels = this._args.map((value, index) => (
      touchs.indexOf(value) > -1 ? values.push(this._args[index + 1]) : -1
    ));
    dels.map((value) => (value === -1));
    commandOption.value = values;

    this._commandOptions.push(commandOption);

    return commandOption;
  }

  public set args(args: string[]) {
    this._args = args;
  }
}
