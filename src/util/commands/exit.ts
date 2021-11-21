import Command from '../Command';

export default class ExitCommand extends Command {
  constructor() {
    super('exit', 'exit tab');
  }

  async* run(args: string[], path: string) {
    window.close();
    yield {
      output: `${this.name}`,
      path,
      error: false,
    };
  }
}
