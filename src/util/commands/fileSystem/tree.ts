import Folder from './node/folder';
import TextFile from './node/textFile';

const fileTree = new Folder('', [
  new Folder('home', [
    new Folder('xiaoxigua', [
      new TextFile('about.txt', '喔喔不行\n我快不行了\n\n\n\n\n\nYoung把我電的不要不要的'),
      new Folder('project', []),
    ]),
  ]),
]);

export default fileTree;
