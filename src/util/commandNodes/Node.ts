import CommandManager from '../CommandManage';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export interface CommandLeftInfo {
  output: string[];
  path: string;
  error: boolean;
}
export default abstract class Node {
  private _right: Node;

  private _left!: CommandLeftInfo;

  private _args: string[];

  constructor(left: Node, right: Node, args: string[]) {
    this._right = right;
    this._args = args;
  }

  async* run(path: string, _commandManager: CommandManager):
    AsyncGenerator<CommandReturnInfo, void, CommandReturnInfo> {
    yield {
      path,
      output: this._args.join(' '),
      error: false,
    };
  }

  async* init(path: string, commandManager: CommandManager) {
    const commandName = this.args[0];
    const seatchNode = commandManager.commands.find((command) => command.name === commandName);
    this._left = {
      path,
      output: [],
      error: false,
    };

    if (seatchNode) {
      const info = seatchNode.init(this.args, path, commandManager);
      let commandReturnInfo = await info.next();

      while (!commandReturnInfo.done) {
        yield {
          output: commandReturnInfo.value.output,
          path: commandReturnInfo.value.path,
          error: commandReturnInfo.value.error,
        };

        this._left.path = commandReturnInfo.value.path;
        this._left.output.push(commandReturnInfo.value.output.toString());
        // eslint-disable-next-line no-await-in-loop
        commandReturnInfo = await info.next();
      }
    } else {
      yield {
        output: `\nCommand  '${commandName}'  is  not  found\n\n`,
        error: true,
        path,
      };

      this._left.error = true;
    }
  }

  public get right(): Node {
    return this._right;
  }

  public get left(): CommandLeftInfo {
    return this._left;
  }

  public get args(): string[] {
    return this._args;
  }
}
