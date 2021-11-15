import Command from '../../Command';
import { CommandReturnInfo } from '../../data/CommandReturnInfo';
import pathParse from './pathParser';

export default class CdCommand extends Command {
  constructor() {
    super('cd', 'directory');
  }

  run(args: string[], path: string): CommandReturnInfo {
    let output = '';
    let outputPath: string = path;

    if (args[0] === undefined) {
      output = '';
    } else {
      const directory = pathParse(path, args[0]);
      if (directory === null) {
        output = `${this.name}: ${args[0]}: No such file or directory`;
      } else {
        if (directory[1] === 'home' && directory[2] === 'xiaoxigua') {
          outputPath = `~${directory.length > 3 ? '/' : ''}`;
          directory.splice(0, 3);
        } else if (directory[1] === 'home') {
          outputPath = '';
        } else if (directory[0] === '') {
          outputPath = '/';
        }
        outputPath += directory?.join('/');
      }
    }

    return {
      output,
      path: outputPath,
    };
  }
}
