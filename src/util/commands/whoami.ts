import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('whoami', 'Show user name');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: 'user',
      path: inputPath,
    };
  }
}
