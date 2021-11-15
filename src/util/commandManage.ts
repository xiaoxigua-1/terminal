import Command from './Command';
import { CommandReturnInfo } from './data/CommandReturnInfo';
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
    const argsArray = this.stringSplit(args);
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

    return searchCommand.init(argsArray, inputPath);
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

  private stringSplit(args: string) {
    const argsArray: string[] = [];
    let str = '';
    let colon = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      switch (i) {
        case '\u00a0':
          if (!colon) {
            argsArray.push(str);
            str = '';
            break;
          }
          str += '\u00a0';
          break;
        case '\'':
        case '"':
          colon = true;
          break;
        default:
          str += i;
          break;
      }
    }
    argsArray.push(str);
    console.log(argsArray);
    return argsArray;
  }
}

export default CommandManager;
