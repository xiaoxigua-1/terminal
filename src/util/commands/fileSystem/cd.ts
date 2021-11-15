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
        if (directory[0] === 'home' && directory[1] === 'xiaoxigua') {
          outputPath = '~/';
          directory.splice(0, 2);
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
