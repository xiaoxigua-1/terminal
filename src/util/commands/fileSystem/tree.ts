import Folder from './node/folder';
import TextFile from './node/textFile';

const fileTree = new Folder('', [
  new Folder('home', [
    new Folder('xiaoxigua', [
      new TextFile('about.txt', 'Ha Ha'),
      new Folder('project', []),
    ]),
  ]),
]);

export default fileTree;
