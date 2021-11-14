export default class ComandOption {
  private _name: string;

  private _help = '';

  private _type = 'TEXT';

  private _aliass: string[] = [];

  private _args: string[] = [];

  private _used: number[] = [];

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

  tag() {
    this._type = 'TAG';
    return this;
  }

  alias(...aliass: string[]) {
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

  public get value() {
    const touchs = this.touch;
    const values: string[] = [];
    const dels = this._args.map((value, index) => (
      touchs.includes(value) ? values.push(this._args[index + 1]) : -1
    ));
    dels.map((value, index) => (value !== -1 ? this._used.push(index) : 0));
    return this._type === 'TAG' ? Boolean(values.length) : values;
  }

  public get used() {
    return this._used;
  }

  public set args(args: string[]) {
    this._args = args;
  }
}
