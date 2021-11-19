import Command from '../../Command';
import { CommandReturnInfo } from '../../data/CommandReturnInfo';
// import pathParse from './pathParser';

export default class PwdCommand extends Command {
  private _valueName: string[] = [];

  private _iname: string[] = [];

  constructor() {
    super('find', 'working directory');
  }

  setValue() {
    this._valueName = this._commandParser.option('name', '-').value as string[];
    this._iname = this._commandParser.option('iname', '-').value as string[];
  }

  async run(args: string[], path: string): Promise<CommandReturnInfo> {
    // const workingDirectory = pathParse(path, '.')?.path.map((p) => p.name).join('/');

    return {
      output: '',
      path,
    };
  }
}
