import fileTree from './tree';
import Folder from './node/folder';
import Node from './data/node';
import { PathData } from './data/returnPathData';

export default function pathParse(
  path: string,
  directory: string,
  parents = false,
): PathData | null {
  let pathArray = path.split('/');
  let start = fileTree;
  const directoryArray = directory.split('/');
  const pathNodes: Node[] = [fileTree];

  if (pathArray[0] === '~') {
    pathArray.splice(0, 1);
    pathArray = ['home', 'xiaoxigua', ...pathArray];
  }

  if (directoryArray[0] === '') {
    directoryArray.splice(0, 1);
  } else if (directoryArray[0] === '~') {
    start = start.searchNode('home') as Folder;
    pathNodes.push(start);
    start = start.searchNode('xiaoxigua') as Folder;
    pathNodes.push(start);
    directoryArray.splice(0, 1);
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of pathArray) {
      if (i !== '') {
        const searchNode = start.searchNode(i) as Folder;

        start = searchNode as Folder;
        pathNodes.push(start);
      }
    }
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const i of directoryArray) {
    if (i === '..') {
      if (pathNodes.length > 1) {
        pathNodes.splice(pathNodes.length - 1, 1);
      }
      start = pathNodes[pathNodes.length - 1] as Folder;
    } else if (i !== '.' && i !== '') {
      const searchNode = (pathNodes[pathNodes.length - 1] as Folder).searchNode(i);

      if (searchNode === null) {
        if (parents) {
          pathNodes.push(new Folder(i, [], 'xiaoxigua'));
        } else {
          return null;
        }
      } else {
        start = searchNode as Folder;
        pathNodes.push(start);
      }
    }
  }

  // pathNodes.splice(0, 1);
  return {
    path: pathNodes,
    type: pathNodes[pathNodes.length - 1].type,
  };
}
