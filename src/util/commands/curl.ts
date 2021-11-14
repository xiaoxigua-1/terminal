import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';

export default class CurlCommand extends Command {
  constructor() {
    super('Aaaaaa', 'curl');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    this._commandParser.args = args;
    const method = this._commandParser.option('-X').value;
    console.log(this.name);
    return {
      output: `method is ${method}`,
      path: inputPath,
    };
  }
}
