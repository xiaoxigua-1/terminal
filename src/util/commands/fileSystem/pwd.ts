import Command from '../../Command';
import { CommandReturnInfo } from '../../data/CommandReturnInfo';
import pathParse from './pathParser';

export default class PwdCommand extends Command {
  constructor() {
    super('pwd', 'working directory');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    const workingDirectory = pathParse(path, '.')?.path.map((p) => p.name).join('/');

    return {
      output: workingDirectory || '/',
      path,
    };
  }
}
