import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';

export default class InfoCommand extends Command {
  constructor() {
    super('Aaaaaa', 'info');
  }

  setValue(args: string[]) {
    console.log(args, this.name);
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: `hi this is ${this.name}`,
      path: inputPath,
    };
  }
}
