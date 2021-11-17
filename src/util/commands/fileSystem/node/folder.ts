import Node from '../data/node';

export default class Folder extends Node {
  private _nodes: Node[];

  constructor(name: string, nodes: Node[]) {
    super(name, 'Folder');
    this._nodes = nodes;
  }

  public searchNode(name: string): Node | null {
    return this._nodes.find((node) => node.name === name) || null;
  }

  public get nodes(): Node[] {
    return this._nodes;
  }
}
