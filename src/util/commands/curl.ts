import axios, { Method } from 'axios';
import Command from '../Command';
import Error from '../../components/error';
import { CommandReturnInfo } from '../data/CommandReturnInfo';

export default class CurlCommand extends Command {
  private _method: Method[] = [];

  constructor() {
    super('curl', '[options...] <url>');
  }

  setValue(args: string[]) {
    this._commandParser.args = args;
    this._method = this._commandParser
      .option('request')
      .alias('-X')
      .default('GET')
      .value as Method[];
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    const url = args[args.length - 1];
    try {
      const response = await axios({
        method: this._method[this._method.length - 1],
        url,
      });

      return {
        output: response.data,
        path,
      };
    } catch (error) {
      return {
        output: Error((error as Error).toString()),
        path,
      };
    }
  }
}
