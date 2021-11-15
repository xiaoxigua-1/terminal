import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super(':Echo [input string]', 'echo');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: args.join(' '),
      path: inputPath,
    };
  }
}
