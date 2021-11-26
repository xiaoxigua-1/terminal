import Command from '../Command';

export default class InfoCommand extends Command {
  constructor() {
    super('info', '[command]');
  }

  async* run(args: string[], path: string) {
    yield {
      output: 'My terminal version: 1.0.0',
      path,
      error: false,
    };
  }
}
