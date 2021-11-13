import Command from './Command';
import { CommandReturnInfo } from './CommandReturnInfo';
import NotFound from '../components/notFound';
import Help from '../components/help';

class CommandManager {
  private commands: Command[];

  constructor() {
    this.commands = [];
  }

  addCommand(command: Command) {
    this.commands.push(command);
  }

  runCommand(args: string, inputPath: string): CommandReturnInfo {
    const argsArray = args.split('\u00a0');
    const name = argsArray[0];
    const searchCommand = this.commands.find((command) => command.name === name);
    argsArray.splice(0, 1);

    if (name === 'help') {
      return {
        output: this.helpCommand(argsArray),
        path: inputPath,
      };
    }

    if (searchCommand === undefined) {
      return {
        output: NotFound(name),
        path: inputPath,
      };
    }

    return searchCommand.run(argsArray, inputPath);
  }

  helpCommand(args: string[]): JSX.Element | string {
    const commandName = args[0];

    if (commandName === undefined) {
      return Help(this.commands);
    }
    const searchCommand = this.commands.find((command) => command.name === commandName);

    if (searchCommand === undefined) return NotFound(commandName);

    return searchCommand.help();
  }
}

export default CommandManager;
