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

  async runCommand(args: string, inputPath: string): Promise<CommandReturnInfo> {
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

    const commandReturnInfo = await searchCommand.init(argsArray, inputPath);

    return commandReturnInfo;
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
    let backslash = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      switch (i) {
        case ' ':
          if (!colon) {
            if (backslash) {
              str += i;
              backslash = false;
              break;
            }

            if (/\S/.test(str)) {
              argsArray.push(str.replaceAll(' ', '\u00a0'));
            }

            str = '';
            break;
          }
          str += i;
          break;
        case '\'':
        case '"':
          colon = !colon;
          break;
        case '\\':
          backslash = true;
          break;
        default:
          str += i;
          break;
      }
    }
    if (/\S/.test(str)) {
      argsArray.push(str.replaceAll(' ', '\u00a0'));
    }

    return argsArray;
  }
}

export default CommandManager;
