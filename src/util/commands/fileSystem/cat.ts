import Command from '../../Command';
import File from './node/file';
import TextFile from './node/textFile';
import pathParse from './pathParser';

export default class CatCommand extends Command {
  constructor() {
    super('cat', '[FILE]...');
  }

  async* run(args: string[], path: string) {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      const pathData = pathParse(path, i);
      if (!pathData) {
        yield {
          output: `cat: ${i}: No such file`,
          path,
          error: true,
        };
        return;
      }

      if (pathData?.type === 'File') {
        const file = pathData?.path[pathData?.path.length - 1] as File;

        if (file.fileType === 'text') {
          yield {
            output: `${(file as TextFile).text}`,
            path,
            error: true,
          };
        } else {
          yield {
            output: '對不起我的技術無法讀取二進位檔 QQ',
            path,
            error: true,
          };
        }
      } else {
        yield {
          output: `cat: read error: Is ${i} directory`,
          path,
          error: true,
        };
      }
    }
  }
}
