import Command from '../Command';

export default class InfoCommand extends Command {
  constructor() {
    super('info', '[command]');
  }

  async* run(args: string[], path: string) {
    yield {
      output: `hi this is ${this.name}`,
      path,
    };
  }
}
