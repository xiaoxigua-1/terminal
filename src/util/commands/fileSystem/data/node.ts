export default class Node {
  private _name: string;

  private _type: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._type = type;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }
}
