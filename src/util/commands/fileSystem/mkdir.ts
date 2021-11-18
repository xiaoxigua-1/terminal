import Command from '../../Command';
import { CommandReturnInfo } from '../../data/CommandReturnInfo';
import pathParse from './pathParser';
import fileTree, { mkdir } from './tree';

export default class MkdirCommand extends Command {
  private _parents: boolean;

  constructor() {
    super('mkdir', '');
    this._parents = false;
  }

  setValue(_args: string[]) {
    this._parents = this._commandParser.option('parents').alias('-p').tag().value as boolean;
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    let outputText = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const inputPath of args) {
      // eslint-disable-next-line no-restricted-syntax
      const pathString = pathParse(path, inputPath, true)?.path.map((p) => p.name);
      if (pathString !== undefined) {
        const mkdirNodes = mkdir(
          pathString.slice(1, pathString.length),
          fileTree.nodes, 0,
          this._parents,
        );

        if (mkdirNodes !== 'no' && mkdirNodes !== null) {
          fileTree.nodes = mkdirNodes;
        } else if (mkdirNodes === 'no') {
          outputText += `mkdir: can't create directory '${inputPath}': No such file or directory \n`;
        } else {
          outputText += `mkdir: can't create directory '${inputPath}': File exists\n`;
        }
      }
    }

    return {
      output: outputText,
      path,
    };
  }
}
