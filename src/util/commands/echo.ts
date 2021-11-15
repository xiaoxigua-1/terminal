import Command from '../Command';
import { CommandReturnEcho } from '../CommandReturnEcho';

export default class EchoCommand extends Command {
  constructor() {
    super(':Echo [input string]', 'echo');
  }

  setValue(args: string[]) {
    console.log(args, this.name);
  }

  run(args: string[], inputPath: string): CommandReturnEcho {
    return {
      output: `${this.name}`,
      path: inputPath,
    };
  }
}
