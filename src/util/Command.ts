import { CommandReturnInfo } from './CommandReturnInfo';

export interface CommandProp {
  name: string;
}

export abstract class Command {
  public name = '';

  public run(args: string[], inputPath: string): CommandReturnInfo {
    return {
      output: `${this.name} run fuck you ${args.join('')}`,
      path: inputPath,
    };
  }
}
