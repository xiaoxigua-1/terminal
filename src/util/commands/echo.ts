import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('[args ...]', 'echo');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    console.log(args);
    return {
      output: args.join(' '),
      path: inputPath,
    };
  }
}
