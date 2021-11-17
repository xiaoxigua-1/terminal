import Command from '../../Command';
import { CommandReturnInfo } from '../../data/CommandReturnInfo';
import File from './node/file';
import TextFile from './node/textFile';
import pathParse from './pathParser';

export default class CatCommand extends Command {
  constructor() {
    super('cat', '[FILE]');
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    let text = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      const pathData = pathParse(path, i);

      if (pathData?.type !== 'folder') {
        const file = pathData?.path[pathData?.path.length - 1] as File;

        if (file.fileType === 'text') {
          text += `${(file as TextFile).text}\n`;
        }
      }
    }

    return {
      output: text,
      path,
    };
  }
}
