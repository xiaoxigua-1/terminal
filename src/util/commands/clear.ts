import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class ClearCommand extends Command {
  constructor() {
    super('clear', '[options]');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    // clear console
    this._commandManager.clearConsole();

    return {
      output: args.join(' '),
      path,
    };
  }
}
