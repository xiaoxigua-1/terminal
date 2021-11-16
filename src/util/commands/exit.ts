import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class ExitCommand extends Command {
  constructor() {
    super('exit', 'exit tab');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    window.close();
    return {
      output: `${this.name}`,
      path,
    };
  }
}
