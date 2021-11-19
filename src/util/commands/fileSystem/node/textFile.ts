import File from './file';

export default class TextFile extends File {
  private _text: string;

  constructor(name: string, text: string, owner: string) {
    super(name, 'text', owner);
    this._text = text;
  }

  public get text(): string {
    return this._text;
  }

  public set text(text: string) {
    this._text = text;
  }
}
