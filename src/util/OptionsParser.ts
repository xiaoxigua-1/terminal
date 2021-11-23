import ComandOption from './CommandOption';

export default class OptionsParser {
  private _commandOptions: ComandOption[];

  private _args: string[] = [];

  constructor() {
    this._commandOptions = [];
  }

  option(optionName: string, beginning = '--') {
    const commandOption = new ComandOption(`${beginning}${optionName}`);
    commandOption.args = this._args;

    this._commandOptions.push(commandOption);

    return commandOption;
  }

  clearCommandOptions() {
    this._commandOptions = [];
  }

  public set args(args: string[]) {
    this._args = args;
  }

  public get used() {
    return this._commandOptions.map((value) => value.used);
  }

  public get commandOptions() {
    return this._commandOptions;
  }
}
