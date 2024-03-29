import Command from '../../Command';
import pathParse from './pathParser';
import fileTree, { make } from './tree';

export default class MkdirCommand extends Command {
  private _parents = false;

  private _verbose = false;

  constructor() {
    super('mkdir', '[OPTIONS] DIRECTORY...');
  }

  setValue(_args: string[]) {
    this._parents = this._optionsParser.option('parents').alias('-p').tag().value as boolean;
    this._verbose = this._optionsParser.option('verbose').alias('-v').tag().value as boolean;
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const inputPath of args) {
      // eslint-disable-next-line no-restricted-syntax
      const pathString = pathParse(path, inputPath, true)?.path.map((p) => p.name);
      if (pathString !== undefined) {
        const mkdirNodes = make(
          pathString.slice(1, pathString.length),
          fileTree.nodes, 0,
          this._parents,
          this._commandManager.user,
        );

        if (mkdirNodes !== 'no' && mkdirNodes !== null) {
          fileTree.nodes = mkdirNodes;
          if (this._verbose) {
            yield {
              output: `created directory: '${inputPath}'`,
              path,
              error: false,
            };
          }
        } else if (mkdirNodes === 'no') {
          yield {
            output: `mkdir: can't create directory '${inputPath}': No such file or directory `,
            path,
            error: true,
          };
        } else {
          yield {
            output: `mkdir: can't create directory '${inputPath}': File exists`,
            path,
            error: true,
          };
        }
      }
    }
  }
}
