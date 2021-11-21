import Command from '../../Command';
import File from './node/file';
import TextFile from './node/textFile';
import pathParse from './pathParser';

export default class CatCommand extends Command {
  constructor() {
    super('cat', '[FILE]...');
  }

  async* run(args: string[], path: string) {
    let text = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      const pathData = pathParse(path, i);

      if (pathData?.type === 'File') {
        const file = pathData?.path[pathData?.path.length - 1] as File;

        if (file.fileType === 'text') {
          text += `${(file as TextFile).text}\n`;
        } else {
          text += '對不起我的技術無法讀取二進位檔 QQ\n';
        }
      } else {
        text += `cat: read error: Is ${i} directory`;
      }
    }

    yield {
      output: text,
      path,
      error: false,
    };
  }
}
