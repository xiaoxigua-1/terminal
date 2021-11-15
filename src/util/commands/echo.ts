import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('echo', '[args ...]');
  }

  run(args: string[], path: string): CommandReturnInfo {
    return {
      output: args.join(' '),
      path,
    };
  }
}
