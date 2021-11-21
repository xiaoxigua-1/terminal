import Command from '../Command';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('echo', '[args ...]');
  }

  async* run(args: string[], path: string) {
    yield {
      output: args.join(' '),
      path,
      error: false,
    };
  }
}
