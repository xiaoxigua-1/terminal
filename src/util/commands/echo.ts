import Command from '../Command';
import { CommandReturnEcho } from '../CommandReturnEcho';

export default class EchoCommand extends Command {
  private value: string[] = [];

  constructor() {
    super(':Echo [input string]', 'echo');
  }

  setValue(args: string[]) {
    console.log(args, this.name);
    this.value = ['input string'];
  }

  run(args: string[], inputPath: string): CommandReturnEcho {
    return {
      output: `${this.value}`,
      path: inputPath,
    };
  }
}
