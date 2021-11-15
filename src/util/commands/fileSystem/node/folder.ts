import Node from '../data/node';

export default class Folder extends Node {
  private _nodes: Node[];

  constructor(name: string, nodes: Node[]) {
    super(name, 'folder');
    this._nodes = nodes;
  }

  public get nodes(): Node[] {
    return this._nodes;
  }
}
