import ComandOption from './CommandOption';

export default class CommandParser {
  private _commandOptions: ComandOption[];

  private _args: string[] = [];

  constructor() {
    this._commandOptions = [];
  }

  option(optionName: string) {
    const commandOption = new ComandOption(`--${optionName}`);
    commandOption.args = this._args;

    this._commandOptions.push(commandOption);

    return commandOption;
  }

  public set args(args: string[]) {
    this._args = args;
  }

  public get used() {
    return this._commandOptions.map((value) => value.used);
  }
}
