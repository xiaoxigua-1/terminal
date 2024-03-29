import Command from '../../Command';
import pathParse from './pathParser';

export default class CdCommand extends Command {
  constructor() {
    super('cd', 'directory');
  }

  async* run(args: string[], path: string) {
    let output = '';
    let outputPath = path;

    if (args[0] === undefined) {
      output = '';
    } else {
      const directory = pathParse(path, args[0]);

      if (directory === null) {
        output = `${this.name}: can't cd to ${args[0]}: No such file or directory`;
      } else if (directory.type !== 'Folder') {
        output = `${this.name}: ${args[0]}: No such directory`;
      } else {
        if (directory.path[1]?.name === 'home' && directory.path[2]?.name === this._commandManager.user) {
          outputPath = `~${directory.path.length > 3 ? '/' : ''}`;
          directory.path.splice(0, 3);
        } else if (directory.path[1]?.name !== undefined) {
          outputPath = '';
        } else if (directory.path[0]?.name === '') {
          outputPath = '/';
        }

        outputPath += directory.path.map((p) => p.name)?.join('/');
      }
    }

    yield {
      output,
      path: outputPath,
      error: false,
    };
  }
}
