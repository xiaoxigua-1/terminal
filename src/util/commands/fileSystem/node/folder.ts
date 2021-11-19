import Node from '../data/node';

export default class Folder extends Node {
  private _nodes: Node[];

  constructor(name: string, nodes: Node[], owner: string) {
    super(name, 'Folder', owner);
    this._nodes = nodes;
  }

  public searchNode(name: string): Node | null {
    return this._nodes.find((node) => node.name === name) || null;
  }

  public get nodes(): Node[] {
    return this._nodes;
  }

  public set nodes(nodes: Node[]) {
    this._nodes = nodes;
  }
}
