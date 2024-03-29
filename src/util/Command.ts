/* eslint-disable no-restricted-syntax */
import { CommandReturnInfo } from './data/CommandReturnInfo';
import OptionsParser from './OptionsParser';
import CommandManager from './CommandManage';

interface CommandSetValue {
  setValue: (_args: string[]) => void;
}

export default abstract class Command implements CommandSetValue {
  private _info = '';

  private _name = '';

  protected _commandManager!: CommandManager;

  protected _optionsParser = new OptionsParser();

  constructor(name: string, info: string) {
    this._info = info;
    this._name = name;
  }

  // eslint-disable-next-line class-methods-use-this
  setValue(_args: string[]): void {
    // do nothing.
  }

  // eslint-disable-next-line no-unused-vars
  abstract run(args: string[], path: string): AsyncGenerator<
    CommandReturnInfo, void, CommandReturnInfo
  >

  help(): string | JSX.Element {
    return `${this._name}: ${this._info.split('\n').map(
      (value, index) => (index !== 0 ? `    ${value}` : value),
    ).join('\n')}`;
  }

  async* init(
    args: string[],
    inputPath: string,
    commandManager: CommandManager,
  ): AsyncGenerator<CommandReturnInfo> {
    this._commandManager = commandManager;
    this._optionsParser.args = args;
    this.setValue(args);

    const help = this._optionsParser.option('help').alias('-h').tag().value;
    const notUsedOptions = args.filter(
      (arg, index) => (
        this._optionsParser.used.find((used) => used.includes(index)) === undefined && /^-+.+$/.test(arg)
      ),
    );

    if (notUsedOptions.length) {
      for (const option of notUsedOptions) {
        yield {
          output: `${this._name}: unrecognized option ${(option.match(/[^-]+/) as string[])[0]}\n`,
          path: inputPath,
          error: false,
        };
      }
    }

    if (help || notUsedOptions.length) {
      const helpText = `Usage: ${this._name} ${this._info}\n${
        this._optionsParser.commandOptions.map((value) => (
          value.alias.length ? '      '
            : `  ${value.helpData.aliass.join(', ')}, `
            + `${value.helpData.name} ${value.helpData.type} ${value.helpData.help}`
        )).join('\n')}`;

      this._optionsParser.clearCommandOptions();

      yield {
        output: helpText,
        path: inputPath,
        error: false,
      };

      return;
    }

    const commandReturnInfo = this.run(args.filter(
      (arg, index) => (!/^-+.+$/.test(arg) && !this._optionsParser.used.find((optionUsed) => optionUsed.includes(index))),
    ), inputPath);

    this._optionsParser.clearCommandOptions();

    let nexCommandInfo = await commandReturnInfo.next();
    while (!nexCommandInfo.done) {
      yield nexCommandInfo.value;
      // eslint-disable-next-line no-await-in-loop
      nexCommandInfo = await commandReturnInfo.next();
    }
  }

  public get name() {
    return this._name;
  }

  public get info() {
    return this._info;
  }
}
