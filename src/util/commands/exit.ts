import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class ExitCommand extends Command {
  constructor() {
    super('exit', 'exit tab');
  }

  run(args: string[], path: string): CommandReturnInfo {
    window.close();
    return {
      output: `${this.name}`,
      path,
    };
  }
}
