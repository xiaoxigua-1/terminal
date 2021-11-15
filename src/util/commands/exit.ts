import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';

export default class ExitCommand extends Command {
  constructor() {
    super('exit tab', 'exit');
  }

  setValue(args: string[]) {
    console.log(args, this.name);
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    window.close();
    return {
      output: `${this.name}`,
      path: inputPath,
    };
  }
}
