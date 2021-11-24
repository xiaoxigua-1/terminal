import Node from './Node';
import CommandManager from '../CommandManage';
import pathParse from '../commands/fileSystem/pathParser';
import fileTree, { make } from '../commands/fileSystem/tree';
import { CommandReturnInfo } from '../data/CommandReturnInfo';
import { PathData } from '../commands/fileSystem/data/returnPathData';
import Folder from '../commands/fileSystem/node/folder';
import TextFile from '../commands/fileSystem/node/textFile';

export default class WriteFileNode extends Node {
  private _overwrite: boolean;

  constructor(right: Node, args: string[], overwrite = false) {
    super(args);
    this.right = right;
    this.output = false;
    this._overwrite = overwrite;
  }

  async* run(path: string, commandManager: CommandManager): AsyncGenerator<CommandReturnInfo> {
    const filePath = this.right.args[0];
    const outputPath = pathParse(path, filePath, true) as PathData;
    const outputPathStrArray = outputPath.path.map((p) => p.name);
    const nodes = make(
      outputPathStrArray.slice(1, outputPathStrArray.length),
      fileTree.nodes,
      0,
      false,
      commandManager.user,
      'File',
      this.left.output.join('\n'),
    );

    if (nodes && nodes !== 'no') {
      fileTree.nodes = nodes;
    } else if (nodes === 'no') {
      yield {
        output: `bash: ${filePath}: No such file or directory`,
        path,
        error: false,
      };
    } else {
      const nodesRecord = [fileTree];
      let node = fileTree.searchNode(outputPathStrArray[1]) as Folder;

      for (let i = 2; i < outputPathStrArray.length - 1; i += 1) {
        node = node.searchNode(outputPathStrArray[i]) as Folder;
        nodesRecord.push(node);
      }

      const endNode = node.searchNode(
        outputPathStrArray[outputPathStrArray.length - 1],
      ) as TextFile;

      if (this._overwrite) {
        endNode.text = this.left.output.join('\n');
      } else {
        endNode.text += `\n${this.left.output.join('\n')}`;
      }

      node.nodes[node.nodes.indexOf(endNode)] = endNode;

      for (let i = nodesRecord.length - 2; i >= 0; i -= 1) {
        nodesRecord[i].nodes[nodesRecord[i].nodes.indexOf(node)] = node;
        node = nodesRecord[i];
      }
    }

    yield {
      output: '',
      path,
      error: false,
    };
  }
}
