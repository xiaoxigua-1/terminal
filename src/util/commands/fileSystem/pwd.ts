import Command from '../../Command';
import pathParse from './pathParser';

export default class PwdCommand extends Command {
  constructor() {
    super('pwd', 'working directory');
  }

  async* run(args: string[], path: string) {
    const workingDirectory = pathParse(path, '.')?.path.map((p) => p.name).join('/');

    yield {
      output: workingDirectory || '/',
      path,
      error: false,
    };
  }
}
