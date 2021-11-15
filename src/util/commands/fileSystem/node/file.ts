import Node from '../data/node';
import { FileType } from '../data/fileType';

export default class File extends Node {
  private _fileType: string;

  constructor(name: string, type: FileType) {
    super(name, 'File');
    this._fileType = type;
  }
}
