import Folder from './node/folder';
import TextFile from './node/textFile';
import Node from './data/node';

const fileTree = new Folder('', [
  new Folder('home', [
    new Folder('xiaoxigua', [
      new TextFile('about.txt', '喔喔不行\n我快不行了\n\n\n\n\n\nYoung把我電的不要不要的', 'xiaoxigua'),
      new Folder('project', [], 'xiaoxigua'),
    ], 'xiaoxigua'),
  ], 'xiaoxigua'),
], 'xiaoxigua');

export default fileTree;

export function make(
  path: string[],
  nodes: Node[],
  index: number,
  parents = false,
  user: string,
  type: 'File' | 'Folder' = 'Folder',
  content = '',
): Node[] | null | 'no' {
  const findNode = nodes.find(
    (node) => (node.name === path[index]
      && node.type === ((index === path.length - 1) ? type : 'Folder')),
  ) as Folder | undefined;

  if (findNode === undefined) {
    if (index === path.length - 1) {
      if (type === 'Folder') {
        nodes.push(new Folder(path[index], [], user));
      } else if (type === 'File') {
        nodes.push(new TextFile(path[index], content, user));
      }
    } else if (parents) {
      const returnNodes = make(path, [], index + 1, parents, user, type, content);

      if (returnNodes !== null && returnNodes !== 'no') {
        nodes.push(new Folder(path[index], returnNodes, user));
      }
    } else {
      return 'no';
    }
  } else {
    if (index === path.length - 1) return null;
    const findNodeIndex = nodes.indexOf(findNode);
    const returnNodes = make(path, findNode.nodes, index + 1, parents, user, type, content);

    if (returnNodes !== null && returnNodes !== 'no') {
      // eslint-disable-next-line no-param-reassign
      (nodes[findNodeIndex] as Folder).nodes = returnNodes;
    } else {
      return null;
    }
  }

  return nodes;
}

export function rm(
  path: string[],
  pathString: string,
  r: boolean,
  d: boolean,
  f: boolean,
): string {
  const nodesRecord: Folder[] = [fileTree];
  let node: Folder = fileTree.searchNode(path[1]) as Folder;
  let index = 2;

  // 路徑上的個節點
  while (path[index] !== undefined && index < path.length - 1) {
    node = (node as Folder).searchNode(path[index]) as Folder;
    index += 1;
    nodesRecord.push(node as Folder);
  }

  // 要刪除的節點
  const endNode = (node as Folder).searchNode(path[index]);

  // 節點類型
  if (endNode?.type === 'Folder') {
    if (d) {
      if ((endNode as Folder).nodes.length !== 0) {
        return f ? '' : `rm: cannot remove '${pathString}': Directory not empty`;
      }

      const { nodes } = node;
      nodes.splice(nodes.indexOf(endNode), 1);
      nodesRecord[nodesRecord.length - 1].nodes = nodes;
      node = nodesRecord[nodesRecord.length - 1];

      for (let i = nodesRecord.length - 2; i >= 0; i -= 1) {
        nodesRecord[i].nodes[nodesRecord[i].nodes.indexOf(node)] = node;
        node = nodesRecord[i];
      }

      return '';
    }

    if (r) {
      return 'asd';
    }

    return `rm: '${pathString}' is a directory`;
  }

  if (endNode?.type === 'File') {
    const { nodes } = node;
    nodes.splice(nodes.indexOf(endNode), 1);
    nodesRecord[nodesRecord.length - 1].nodes = nodes;
    node = nodesRecord[nodesRecord.length - 1];

    for (let i = nodesRecord.length - 2; i >= 0; i -= 1) {
      nodesRecord[i].nodes[nodesRecord[i].nodes.indexOf(node)] = node;
      node = nodesRecord[i];
    }
  }

  return '';
}
