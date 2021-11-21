import Command from '../Command';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super('whoami', 'Show user name');
  }

  async* run(args: string[], path: string) {
    yield {
      output: this._commandManager.user,
      path,
      error: false,
    };
  }
}
