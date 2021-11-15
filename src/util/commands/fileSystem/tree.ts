import Folder from './node/folder';
import TextFile from './node/textFile';

const fileTree = new Folder('~', [
  new TextFile('about.txt', 'Ha Ha'),
  new Folder('project', []),
]);

export default fileTree;
