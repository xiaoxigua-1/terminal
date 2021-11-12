import { CommandReturnInfo } from './CommandReturnInfo';

export default abstract class Command {
  private _info = '';

  private _name = '';

  constructor(info: string, name: string) {
    this._info = info;
    this._name = name;
  }

  // eslint-disable-next-line no-unused-vars
  abstract run(args: string[], inputPath: string): CommandReturnInfo

  abstract help(): string | JSX.Element

  public get name() {
    return this._name;
  }

  public get info() {
    return this._info;
  }
}
