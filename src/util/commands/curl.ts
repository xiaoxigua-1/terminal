import Command from '../Command';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class CurlCommand extends Command {
  private _method: string[] = [];

  constructor() {
    super('curl', '[options...] <url>');
  }

  setValue(args: string[]) {
    this._commandParser.args = args;
    this._method = this._commandParser
      .option('request')
      .alias('-X')
      .default('GET')
      .value as string[];
  }

  run(args: string[], path: string): CommandReturnInfo {
    return {
      output: `method is ${this._method}`,
      path,
    };
  }
}
