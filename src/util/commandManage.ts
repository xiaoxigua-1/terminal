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
    const argsArray = args.split(' ');
    const name = argsArray[0];
    const searchCommand = this.commands.find((command) => command.name === name);

    argsArray.splice(0, 1);

    if (searchCommand === undefined) {
      return {
        output: NotFound(name),
        path: inputPath,
      };
    }

    return searchCommand.run(argsArray, inputPath);
  }

  helpCommand(path: string): JSX.Element {
    const cloneCommands: Command[] = [...this.commands];
    cloneCommands.map((value: Command) => ({
      output: value.info,
      path,
    }));
    return Help(cloneCommands);
  }
}

export default CommandManager;
