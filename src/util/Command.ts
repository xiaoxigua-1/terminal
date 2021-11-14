import { CommandReturnInfo } from './CommandReturnInfo';
import CommandParser from './CommandParser';

export default abstract class Command {
  private _info = '';

  private _name = '';

  protected _commandParser = new CommandParser();

  constructor(info: string, name: string) {
    this._info = info;
    this._name = name;
  }

  // eslint-disable-next-line no-unused-vars
  abstract run(args: string[], inputPath: string): CommandReturnInfo

  help(): string | JSX.Element {
    return `${this._name}: ${this._info.split('\n').map(
      (value, index) => (index !== 0 ? `\u00a0\u00a0\u00a0\u00a0${value}` : value),
    ).join('\n')}`;
  }

  init(args: string[], inputPath: string): CommandReturnInfo {
    this._commandParser.args = args;
    const help = this._commandParser.option('help').alias('-h').tag().value;
    if (help) {
      const helpText = `Usage: ${this._name} ${this._info}
      ${this._commandParser.commandOptions.map((value) => (
    `\u00a0\u00a0\u00a0\u00a0${value.helpData.name} ${value.helpData.type} ${value.helpData.help}`
  ))}
      `;
      return {
        output: helpText,
        path: inputPath,
      };
    }
    return this.run(args, inputPath);
  }

  public get name() {
    return this._name;
  }

  public get info() {
    return this._info;
  }
}
