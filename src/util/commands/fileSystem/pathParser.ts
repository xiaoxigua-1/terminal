import fileTree from './tree';
import Folder from './node/folder';

export default function pathParse(path: string, directory: string): string[] | null {
  let pathArray = path.split('/');
  const directoryArray = directory.split('/');
  const pathNodes: Folder[] = [fileTree];
  let start = fileTree;

  if (pathArray[0] === '~') {
    pathArray.splice(0, 1);
    pathArray = ['home', 'xiaoxigua', ...pathArray];
  }

  if (directoryArray[0] === '') {
    directoryArray.splice(0, 1);
    pathNodes.push(start);
  } else if (directoryArray[0] === '~') {
    start = (start.searchNode('home') as Folder).searchNode('xiaoxigua') as Folder;
    pathNodes.push(start);
  } else {
    // eslint-disable-next-line no-restricted-syntax
    for (const i of pathArray) {
      const searchNode = start.searchNode(i) as Folder;

      start = searchNode as Folder;
      pathNodes.push(start);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const i of directoryArray) {
      if (i === '..') {
        pathNodes.splice(pathNodes.length - 1, 1);
        start = pathNodes[pathNodes.length - 1];
      } else if (i === '.' || i === '') {
        // 窩不知爆
      } else {
        const searchNode = pathNodes[pathNodes.length - 1].searchNode(i);
        if (searchNode === null) {
          return null;
        }
        start = searchNode as Folder;
        pathNodes.push(start);
      }
    }
  }
  pathNodes.splice(0, 1);
  return pathNodes.map((node) => node.name);
}
