export default class ComandOption {
  private _name: string;

  private _help: string;

  private _type: string;

  constructor(name: string) {
    this._name = name;
    this._help = '';
    this._type = 'TEXT';
  }

  help(text: string) {
    this._help = text;
    return this;
  }

  int() {
    this._type = 'INT';
    return this;
  }

  string() {
    this._type = 'TEXT';
    return this;
  }
}
