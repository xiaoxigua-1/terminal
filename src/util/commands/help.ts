import Command from '../Command';

export default class HelpCommand extends Command {
  constructor() {
    super('help', '[options...]');
  }

  async* run(args: string[], path: string) {
    yield {
      output: this._commandManager.helpCommand(args),
      path,
      error: false,
    };
  }
}
