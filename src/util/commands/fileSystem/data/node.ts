export default class Node {
  private _name: string;

  private _type: string;

  private _permissions: string;

  private _owner: string;

  private _group: string;

  constructor(name: string, type: string, owner: string) {
    this._name = name;
    this._type = type;
    this._permissions = '';
    this._owner = owner;
    this._group = owner;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }
}
