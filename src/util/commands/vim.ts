import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';
import Vim from '../../components/vim';

export default class ClearCommand extends Command {
  constructor() {
    super('vim', 'file');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    // clear console

    return {
      output: Vim('a', () => true),
      path,
    };
  }
}
