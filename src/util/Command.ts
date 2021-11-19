import { CommandReturnInfo } from './data/CommandReturnInfo';
import CommandParser from './CommandParser';
import CommandManager from './commandManage';

interface CommandSetValue {
  setValue: (_args: string[]) => void;
}

export default abstract class Command implements CommandSetValue {
  private _info = '';

  private _name = '';

  protected _commandManager!: CommandManager;

  protected _commandParser = new CommandParser();

  constructor(name: string, info: string) {
    this._info = info;
    this._name = name;
  }

  // eslint-disable-next-line class-methods-use-this
  setValue(_args: string[]): void {
    // do nothing.
  }

  // eslint-disable-next-line no-unused-vars
  abstract run(args: string[], path: string): Promise<CommandReturnInfo>

  help(): string | JSX.Element {
    return `${this._name}: ${this._info.split('\n').map(
      (value, index) => (index !== 0 ? `\u00a0\u00a0\u00a0\u00a0${value}` : value),
    ).join('\n')}`;
  }

  async init(
    args: string[],
    inputPath: string,
    commandManager: CommandManager,
  ): Promise<CommandReturnInfo> {
    this._commandManager = commandManager;
    this._commandParser.args = args;
    this.setValue(args);
    const help = this._commandParser.option('help').alias('-h').tag().value;

    if (help) {
      const helpText = `Usage: ${this._name} ${this._info}
      ${this._commandParser.commandOptions.map((value) => (
    `\u00a0\u00a0\u00a0\u00a0${value.helpData.name} ${value.helpData.type} ${value.helpData.help}`
  )).join('\n')}
      `;

      this._commandParser.clearCommandOptions();

      return {
        output: helpText,
        path: inputPath,
      };
    }

    const commandReturnInfo = await this.run(args.filter(
      (_arg, index) => (
        this._commandParser.used.find((used) => used.includes(index)) === undefined
      ),
    ), inputPath);
    this._commandParser.clearCommandOptions();
    return commandReturnInfo;
  }

  public get name() {
    return this._name;
  }

  public get info() {
    return this._info;
  }
}
