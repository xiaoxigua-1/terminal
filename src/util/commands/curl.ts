import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';

export default class CurlCommand extends Command {
  private _method: string[] = [];

  constructor() {
    super(':curl [options...] <url>', 'curl');
  }

  setValue(args: string[]) {
    this._commandParser.args = args;
    this._method = this._commandParser.option('request').alias('-X').value as string[];
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: `method is ${this._method}`,
      path: inputPath,
    };
  }
}
