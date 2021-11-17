import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class ClearCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('clear', '');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    return {
      output: args.join(' '),
      path,
    };
  }
}
