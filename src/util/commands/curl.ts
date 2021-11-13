import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';
import CommandParser from '../CommandParser';

export default class CurlCommand extends Command {
  constructor() {
    super('Aaaaaa', 'curl');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    const commandParser = new CommandParser(args);
    const method = commandParser.option('-X').value;
    console.log(method);
    return {
      output: `hi this is ${this.name}`,
      path: inputPath,
    };
  }

  help() {
    return `${this.info} 殺洨`;
  }
}
