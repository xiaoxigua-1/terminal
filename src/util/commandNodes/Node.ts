import CommandManager from '../CommandManage';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export interface CommandLeftInfo {
  output: string[];
  path: string;
  error: boolean;
}
export default class Node {
  private _left!: CommandLeftInfo;

  public right!: Node;

  private _args: string[];

  constructor(args: string[]) {
    this._args = args;
  }

  async* run(path: string, _commandManager: CommandManager):
    AsyncGenerator<CommandReturnInfo, void, CommandReturnInfo> {
    yield {
      output: '',
      path,
      error: false,
    };
  }

  async* init(path: string, commandManager: CommandManager) {
    const commandName = this.args[0];
    this.args.splice(0, 1);
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

    const info = this.run(this._left.path, commandManager);
    let commandInfo = await info.next();

    while (!commandInfo.done) {
      yield commandInfo.value;
      // eslint-disable-next-line no-await-in-loop
      commandInfo = await info.next();
    }
  }

  public get left(): CommandLeftInfo {
    return this._left;
  }

  public get args(): string[] {
    return this._args;
  }
}
