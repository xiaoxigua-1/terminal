import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default abstract class Node {
  private _right: Node;

  private _args: string[];

  constructor(left: Node, right: Node, args: string[]) {
    this._right = right;
    this._args = args;
  }

  async* run(path: string, _commands: Command[]):
    AsyncGenerator<CommandReturnInfo, void, CommandReturnInfo> {
    yield {
      path,
      output: this._args.join(' '),
      error: false,
    };
  }

  public get right(): Node {
    return this._right;
  }

  public get args(): string[] {
    return this._args;
  }
}
