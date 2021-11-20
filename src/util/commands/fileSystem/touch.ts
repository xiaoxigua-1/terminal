import Command from '../../Command';
import pathParse from './pathParser';
import tree, { mkdir } from './tree';

export default class TouchCommand extends Command {
  constructor() {
    super('touch', 'working directory');
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const file of args) {
      const filePath = pathParse(path, file, true)?.path.map((node) => node.name);
      if (filePath) {
        const nodes = mkdir(filePath.slice(1, filePath.length), tree.nodes, 0, false, this._commandManager.user, 'text', '');

        if (nodes !== 'no' && nodes !== null) {
          tree.nodes = nodes;
        } else if (nodes === 'no') {
          yield {
            output: `touch: ${file}: Not a directory`,
            path,
          };
        }
      }
    }
  }
}
