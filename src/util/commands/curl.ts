import axios, { Method } from 'axios';
import Command from '../Command';
import Error from '../../components/error';

export default class CurlCommand extends Command {
  private _method: Method[] = [];

  constructor() {
    super('curl', '[options...] <url>');
  }

  setValue(args: string[]) {
    this._optionsParser.args = args;
    this._method = this._optionsParser
      .option('request')
      .alias('-X')
      .default('GET')
      .value as Method[];
  }

  async* run(args: string[], path: string) {
    const url = args[args.length - 1];

    try {
      const response = await axios({
        method: this._method[this._method.length - 1],
        url,
      });

      yield {
        output: response.data,
        path,
        error: false,
      };
    } catch (error) {
      yield {
        output: Error((error as Error).toString()),
        path,
        error: true,
      };
    }
  }
}
