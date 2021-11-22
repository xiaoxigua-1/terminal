import Command from '../../Command';
import pathParse from './pathParser';
import { rm } from './tree';

export default class RmCommand extends Command {
  private _r = false;

  private _d = false;

  constructor() {
    super('rm', 'working directory');
  }

  setValue() {
    this._r = this._commandParser.option('recursive').alias('-r').tag().value as boolean;
    this._d = this._commandParser.option('dir').alias('-d').tag().value as boolean;
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const inputPath of args) {
      const rmPath = pathParse(path, inputPath)?.path.map((p) => p.name);

      if (rmPath) {
        yield {
          output: rm(rmPath, inputPath, this._r, this._d),
          path,
          error: false,
        };
      } else {
        yield {
          output: `rm: can't remove '${inputPath}': No such file or directory\n`,
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
