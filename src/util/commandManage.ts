import { useState } from 'react';
import Command from './Command';
import NotFound from '../components/notFound';
import Help from '../components/help';
import { ConsoleProp } from '../components/console';

class CommandManager {
  private _commands: Command[];

  private _console: ConsoleProp[];

  private _setConsole!: React.Dispatch<React.SetStateAction<ConsoleProp[]>>;

  private _setUser!: React.Dispatch<React.SetStateAction<string>>;

  private _user = 'xiaoxigua';

  private _path = '~';

  private _setPath!: React.Dispatch<React.SetStateAction<string>>;

  private _clear = false;

  constructor() {
    this._commands = [];
    this._console = [];
  }

  useConsole(): [ConsoleProp[], React.Dispatch<React.SetStateAction<ConsoleProp[]>>] {
    const [consoleArray, setConsoleArray] = useState<ConsoleProp[]>([]);
    this._console = consoleArray;
    this._setConsole = setConsoleArray;

    return [consoleArray, setConsoleArray];
  }

  useUser(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [user, setUser] = useState(this._user);
    this._user = user;
    this._setUser = setUser;

    return [user, setUser];
  }

  usePath(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [path, setPath] = useState('~');
    this._path = path;
    this._setPath = setPath;

    return [path, setPath];
  }

  clearConsole() {
    this._setConsole([]);
    this._clear = true;
  }

  addCommand(command: Command) {
    this._commands.push(command);
  }

  async runCommand(args: string, inputPath: string) {
    const cloneConsole = [...this._console];
    if (/^\s+$/.test(args) || args === '') {
      cloneConsole.push({
        userInput: args,
        output: '',
        path: inputPath,
        user: this._user,
      });
      return;
    }

    const argsArray = this.commandHandler(args);
    const name = argsArray[0];
    const searchCommand = this._commands.find((command) => command.name === name);
    argsArray.splice(0, 1);

    if (name === 'help') {
      cloneConsole.push({
        userInput: args,
        output: this.helpCommand(argsArray),
        path: inputPath,
        user: this._user,
      });

      this._setConsole(cloneConsole);
      return;
    }

    if (searchCommand === undefined) {
      cloneConsole.push({
        userInput: args,
        output: NotFound(name),
        path: inputPath,
        user: this._user,
      });
    } else {
      const commandReturnInfo = await searchCommand.init(argsArray, inputPath, this);

      if (!this._clear) {
        cloneConsole.push({
          userInput: args,
          output: commandReturnInfo.output,
          path: inputPath,
          user: this._user,
        });

        this._setPath(commandReturnInfo.path);
      } else {
        this._setConsole([]);
        this._clear = false;

        return;
      }
    }

    this._setConsole(cloneConsole);
  }

  helpCommand(args: string[]): JSX.Element | string {
    const commandName = args[0];

    if (commandName === undefined) {
      return Help(this._commands);
    }

    const searchCommand = this._commands.find((command) => command.name === commandName);

    if (searchCommand === undefined) return NotFound(commandName);

    return searchCommand.help();
  }

  private commandHandler(args: string) {
    const argsArray: string[] = [];
    let str = '';
    let colon = false;
    let colonStr = '';
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
          if (!colon) {
            colonStr = i;
            colon = true;
          } else if (colonStr === i) {
            colon = false;
          } else {
            str += i;
          }

          break;
        case '\\':
          if (backslash) str += i;
          if (!colon) backslash = true;
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

  public get commands() {
    return this._commands;
  }

  public get user() {
    return this._user;
  }

  public set user(user: string) {
    this._user = user;
  }
}

export default CommandManager;
