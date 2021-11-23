import Command from '../Command';

export default class ClearCommand extends Command {
  constructor() {
    super('vim', 'file');
  }

  async* run(args: string[], path: string) {
    // clear console

    yield {
      output: '',
      path,
      error: false,
    };
  }
}
