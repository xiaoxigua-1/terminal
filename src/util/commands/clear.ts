import Command from '../Command';

export default class ClearCommand extends Command {
  constructor() {
    super('clear', '[options]');
  }

  async* run(args: string[], path: string) {
    // clear console
    this._commandManager.clearConsole();

    yield {
      output: args.join(' '),
      path,
    };
  }
}
