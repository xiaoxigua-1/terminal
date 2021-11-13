export default class ComandOption {
  private _name: string;

  private _help = '';

  private _type = 'TEXT';

  private _aliass: string[] = [];

  private _value: string[] = [];

  constructor(name: string) {
    this._name = name;
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

  file() {
    this._type = 'FILE';
    return this;
  }

  alias(aliass: string[]) {
    this._aliass = aliass;
    return this;
  }

  public get touch() {
    return [this._name, ...this._aliass];
  }

  public get helpData() {
    return {
      name: this._name,
      type: this._type,
      aliass: this._aliass,
      help: this._help,
    };
  }

  public set value(values: string[]) {
    this._value = values;
  }

  public get value() {
    return this._value;
  }
}
