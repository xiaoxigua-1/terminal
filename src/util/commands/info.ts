import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class InfoCommand extends Command {
  constructor() {
    super('info', '[command]');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    return {
      output: `hi this is ${this.name}`,
      path,
    };
  }
}
