import Command from '../Command';
import Vim from '../../components/vim';

export default class ClearCommand extends Command {
  constructor() {
    super('vim', 'file');
  }

  async* run(args: string[], path: string) {
    // clear console

    yield {
      output: Vim('a', () => true),
      path,
    };
  }
}
