import Command from '../Command';
import { CommandReturnInfo } from '../CommandReturnInfo';
import CommandParser from '../CommandParser';

export default class CurlCommand extends Command {
  constructor() {
    super('Aaaaaa', 'curl');
  }

  run(args: string[], inputPath: string): CommandReturnInfo {
    const commandParser = new CommandParser(args);
    console.log(commandParser.option('-X').value);
    return {
      output: `hi this is ${this.name}`,
      path: inputPath,
    };
  }

  help() {
    return `${this.info} 殺洨`;
  }
}
