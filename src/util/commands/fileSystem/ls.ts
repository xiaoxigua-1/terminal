import Command from '../../Command';
import Folder from './node/folder';
import pathParse from './pathParser';
import ColorText from '../../../components/colorText';

export default class LsCommand extends Command {
  constructor() {
    super('ls', '[FILE]');
  }

  async* run(args: string[], path: string) {
    if (args.length === 0) {
      args.push('.');
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      const outputPath = pathParse(path, i);
      if (outputPath) {
        let { nodes } = outputPath.path[outputPath.path.length - 1] as Folder;
        nodes = nodes.sort((a, b) => (b.type.length - a.type.length));

        // eslint-disable-next-line no-restricted-syntax
        for (const node of nodes) {
          yield {
            output: ColorText(`${node.name}\n`, (node.type === 'File' ? '' : '#12488B')),
            path,
          };
        }
      } else {
        yield {
          output: `ls: ${i}: No such file or directory`,
          path,
        };
      }
    }
  }
}
