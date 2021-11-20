import Command from '../../Command';
import { PathData } from './data/returnPathData';
import Ls from '../../../components/ls';
import pathParse from './pathParser';

export default class LsCommand extends Command {
  constructor() {
    super('ls', '[FILE]');
  }

  async* run(args: string[], path: string) {
    const paths: Array<PathData | null> = [];

    if (args.length === 0) {
      args.push('.');
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      paths.push(pathParse(path, i));
    }

    yield {
      output: Ls(paths, args),
      path,
    };
  }
}
