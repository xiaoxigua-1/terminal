import Command from '../Command';

export default class InfoCommand extends Command {
  constructor() {
    super('info', '[command]');
  }

  async* run(args: string[], path: string) {
    yield {
      output: '1\t12\t123\t1234\t\n12345\t123456\t',
      path,
      error: false,
    };
  }
}
