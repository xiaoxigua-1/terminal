import File from './file';

export default class TextFile extends File {
  private _text: string;

  constructor(name: string, text: string) {
    super(name, 'text');
    this._text = text;
  }

  public get text(): string {
    return this._text;
  }
}
