import Command from '../../Command';
import Folder from './node/folder';
import Node from './data/node';
import pathParse from './pathParser';

export default class PwdCommand extends Command {
  private _valueName: string[] = [];

  private _iname: string[] = [];

  private _fileType: string[] = [];

  constructor() {
    super('find', '[options...] [path...]');
  }

  setValue() {
    this._valueName = this._optionsParser.option('name', '-').value as string[];
    this._iname = this._optionsParser.option('iname', '-').value as string[];
    this._fileType = this._optionsParser.option('type', '-').value as string[];
  }

  async* run(args: string[], path: string) {
    if (args.length === 0) {
      args.push('.');
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const searchPath of args) {
      const search = pathParse(path, searchPath)?.path;

      if (search === undefined) {
        yield {
          output: `find: ${searchPath}: No such file or directory`,
          path,
          error: false,
        };
      } else {
        const filesOrDirectorys = [[search[search.length - 1]]];
        const nodes = [search[search.length - 1]];
        let previous: Node | null = null;

        // eslint-disable-next-line no-constant-condition
        while (nodes.length !== 0) {
          // 取最後一個節點資料
          const node = nodes[nodes.length - 1];
          if (node.type === 'File') {
            // 檔案沒有下一層
            nodes.splice(nodes.length - 1, 1);
          } else if (node.type === 'Folder') {
            if ((node as Folder).nodes.length === 0) {
              // 空的
              nodes.splice(nodes.length - 1, 1);
            } else if (previous === null) {
              // 第一個沒上一個
              nodes.push((node as Folder).nodes[0]);
            } else {
              const nextNodes = (node as Folder).nodes;
              const index = nextNodes.indexOf(previous);

              // 沒東西的時候
              if (index < nextNodes.length - 1 && index !== -1) {
                nodes.push(nextNodes[index + 1]);
              } else if (index === -1) {
                nodes.push(nextNodes[0]);
              } else {
                // 到底了
                nodes.splice(nodes.length - 1, 1);
              }
            }
          }

          // 儲存上一個Node資料
          previous = node;

          // 每個節點紀錄下來
          if (filesOrDirectorys.filter(
            (fOrD) => (fOrD.map((p) => p.name).toString() === nodes.map((p) => p.name).toString()),
          ).length === 0) {
            let fileTypeSwitch = true;
            let nameSwitch = true;
            let inameSwitch = true;

            // 檔案類型比對
            // eslint-disable-next-line no-restricted-syntax
            for (const fileType of this._fileType) {
              fileTypeSwitch = nodes[nodes.length - 1].type === (
                // eslint-disable-next-line no-nested-ternary
                fileType === 'f' ? 'File' : fileType === 'd' ? 'Folder' : ''
              );
            }

            // 完全相同比對
            // eslint-disable-next-line no-restricted-syntax
            for (const name of this._valueName) {
              // eslint-disable-next-line no-loop-func
              nodes.forEach((nodeName) => {
                nameSwitch = new RegExp(`^${name.replaceAll('*', '.+')}$`).test(nodeName.name);
              });
            }

            // 不分大小寫比對
            // eslint-disable-next-line no-restricted-syntax
            for (const iname of this._iname) {
              // eslint-disable-next-line no-loop-func
              nodes.forEach((nodeName) => {
                inameSwitch = new RegExp(`^${iname.replaceAll('*', '.+')}$`, 'gi').test(nodeName.name);
              });
            }

            if (fileTypeSwitch && nameSwitch && inameSwitch) {
              yield {
                output: `${nodes.map((nodeName) => (nodeName.name)).join('/')}\n`,
                path,
                error: false,
              };
            }

            filesOrDirectorys.push([...nodes]);
          }
        }
      }
    }
  }
}
