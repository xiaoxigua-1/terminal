import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super(':Show user name', 'whoami');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: 'user',
      path: inputPath,
    };
  }
}
