import { CommandReturnInfo } from './CommandReturnInfo';
import CommandParser from './CommandParser';

export default abstract class Command {
  private _info = '';

  private _name = '';

  protected _commandParser = new CommandParser();

  constructor(info: string, name: string) {
    this._info = info;
    this._name = name;
  }

  // eslint-disable-next-line no-unused-vars
  abstract run(args: string[], inputPath: string): CommandReturnInfo

  help(): string | JSX.Element {
    return this._name;
  }

  public get name() {
    return this._name;
  }

  public get info() {
    return this._info;
  }
}
