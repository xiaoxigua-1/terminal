import Folder from './node/folder';
import TextFile from './node/textFile';
import Node from './data/node';
import { FileType } from './data/fileType';

const fileTree = new Folder('', [
  new Folder('home', [
    new Folder('xiaoxigua', [
      new TextFile('about.txt', '喔喔不行\n我快不行了\n\n\n\n\n\nYoung把我電的不要不要的', 'xiaoxigua'),
      new Folder('project', [], 'xiaoxigua'),
    ], 'xiaoxigua'),
  ], 'xiaoxigua'),
], 'xiaoxigua');

export default fileTree;

export function mkdir(
  path: string[],
  nodes: Node[],
  index: number,
  parents = false,
  user: string,
  type: FileType | 'folder' = 'folder',
  content = '',
): Node[] | null | 'no' {
  const findNode = nodes.find(
    (node) => node.name === path[index] && node.type === 'Folder',
  ) as Folder | undefined;

  if (findNode === undefined) {
    if (index === path.length - 1) {
      if (type === 'folder') {
        nodes.push(new Folder(path[index], [], user));
      } else if (type === 'text') {
        nodes.push(new TextFile(path[index], content, user));
      }
    } else if (parents) {
      const returnNodes = mkdir(path, [], index + 1, parents, user, type, content);

      if (returnNodes !== null && returnNodes !== 'no') {
        nodes.push(new Folder(path[index], returnNodes, user));
      }
    } else {
      return 'no';
    }
  } else {
    if (index === path.length - 1) return null;
    const findNodeIndex = nodes.indexOf(findNode);
    const returnNodes = mkdir(path, findNode.nodes, index + 1, parents, user, type, content);

    if (returnNodes !== null && returnNodes !== 'no') {
      // eslint-disable-next-line no-param-reassign
      (nodes[findNodeIndex] as Folder).nodes = returnNodes;
    } else {
      return null;
    }
  }

  return nodes;
}
