import Command from '../../Command';
import pathParse from './pathParser';
import { rm } from './tree';

export default class RmCommand extends Command {
  constructor() {
    super('rm', 'working directory');
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const inputPath of args) {
      const rmPath = pathParse(path, inputPath)?.path.map((p) => p.name);

      if (rmPath) {
        rm(rmPath);
      } else {
        yield {
          output: `rm: can't remove '${inputPath}': No such file or directory`,
          path,
          error: false,
        };
      }
    }

    yield {
      output: '',
      path,
      error: false,
    };
  }
}
