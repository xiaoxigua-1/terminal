import Command from '../../Command';
import pathParse from './pathParser';
import { rm } from './tree';

export default class RmCommand extends Command {
  private _r = false;

  private _d = false;

  private _f = false;

  constructor() {
    super('rm', '[option...] [file...]');
  }

  setValue() {
    this._r = this._optionsParser.option('recursive')
      .alias('-r', '-R')
      .help('Remove directories and their contents recursively.')
      .tag()
      .value as boolean;
    this._d = this._optionsParser.option('dir')
      .alias('-d')
      .help('Remove empty directories.')
      .tag()
      .value as boolean;
    this._f = this._optionsParser.option('force')
      .alias('-f')
      .tag()
      .help('Ignore nonexistant files, and never prompt before removing.')
      .value as boolean;
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const inputPath of args) {
      const rmPath = pathParse(path, inputPath)?.path.map((p) => p.name);

      if (rmPath) {
        const outputText = rm(rmPath, inputPath, this._r, this._d, this._f);

        yield {
          output: outputText,
          path,
          error: outputText !== '',
        };
      } else if (!this._f) {
        yield {
          output: `rm: can't remove '${inputPath}': No such file or directory`,
          path,
          error: true,
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
