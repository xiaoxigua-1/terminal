import Command from '../Command';
import Node from './Node';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class AndNode extends Node {
  constructor(right: Node, left: Node, args: string[]) {
    super(left, right, args);
  }

  async* run(path: string, commands: Command[]) {
    const commandName = this.args[0];
    const seatchNode = commands.find((command) => command.name === commandName);
    let left: CommandReturnInfo = {
      path,
      output: '',
      error: false,
    };

    if (seatchNode) {
      const info = seatchNode.run(this.args, path);
      let commandReturnInfo = await info.next();
      while (!commandReturnInfo.done) {
        yield {
          output: commandReturnInfo.value.output,
          path: commandReturnInfo.value.path,
          error: commandReturnInfo.value.error,
        };

        left = {
          path: commandReturnInfo.value.path,
          output: '',
          error: true,
        };

        // eslint-disable-next-line no-await-in-loop
        commandReturnInfo = await info.next();
      }
    } else {
      left = {
        output: `\nCommand  '${commandName}'  is  not  found\n\n`,
        error: true,
        path,
      };
    }

    const right = this.right.run(left.path, commands);
    let commandReturnInfo = await right.next();

    while (!commandReturnInfo.done) {
      yield commandReturnInfo.value;
      // eslint-disable-next-line no-await-in-loop
      commandReturnInfo = await right.next();
    }
  }
}
