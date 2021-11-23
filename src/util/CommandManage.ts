import { useState } from 'react';
import Command from './Command';
import Help from '../components/help';
import Console, { ConsoleProp } from '../components/console';

class CommandManager {
  private _commands: Command[];

  private _console: (ConsoleProp | JSX.Element | string)[];

  private _setConsole!: React.Dispatch<
    React.SetStateAction<(ConsoleProp | JSX.Element | string)[]>
  >;

  private _setUser!: React.Dispatch<React.SetStateAction<string>>;

  private _user = 'xiaoxigua';

  private _path = '~';

  private _setPath!: React.Dispatch<React.SetStateAction<string>>;

  private _clear = false;

  constructor() {
    this._commands = [];
    this._console = [];
  }

  useConsole(): [
    (ConsoleProp | JSX.Element | string)[],
    React.Dispatch<React.SetStateAction<(ConsoleProp | JSX.Element | string)[]>>
    ] {
    const [consoleArray, setConsoleArray] = useState<(ConsoleProp | JSX.Element | string)[]>([]);
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
    cloneConsole.push(Console({
      userInput: args,
      path: inputPath,
      user: this._user,
    }));
    if (/^\s+$/.test(args) || args === '') {
      return;
    }

    const argsArray = this.commandHandler(args);
    const name = argsArray[0];
    const searchCommand = this._commands.find((command) => command.name === name);

    argsArray.splice(0, 1);

    if (name === 'help') {
      cloneConsole.push(
        this.helpCommand(argsArray),
      );

      this._setConsole(cloneConsole);
      return;
    }

    if (searchCommand === undefined) {
      cloneConsole.push(`\nCommand  '${name}'  is  not  found\n\n`);
    } else {
      const commandReturnInfo = searchCommand.init(argsArray, inputPath, this);
      // eslint-disable-next-line no-restricted-syntax
      let info = await commandReturnInfo.next();

      while (!info.done) {
        if (!this._clear) {
          cloneConsole.push(info.value.output);

          this._setConsole([...cloneConsole]);
          this._setPath(info.value.path);
        } else {
          this._clear = false;
          return;
        }

        // eslint-disable-next-line no-await-in-loop
        info = await commandReturnInfo.next();
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

    if (searchCommand === undefined) return `\nCommand  '${commandName}'  is  not  found\n\n`;

    return searchCommand.help();
  }

  private commandHandler(args: string) {
    const argsArray: string[] = [];
    let str = '';
    let colon = false;
    let colonStr = '';
    let backslash = false;
    let token = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const i of args) {
      switch (i) {
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

          if (token) {
            argsArray.push(str);
            str = '';
          }

          token = false;
          break;
        case '\\':
          if (backslash) str += i;
          if (!colon) backslash = true;
          if (token) {
            argsArray.push(str);
            str = '';
          }

          token = false;
          break;
        case '|':
        case '>':
        case '&':
          if (!colon && !backslash) {
            if (!token) {
              argsArray.push(str);
              str = i;
              token = true;
            } else {
              str += i;
              argsArray.push(str);
              str = '';
              token = false;
            }
          } else {
            str += i;
          }
          break;
        default:
          if (!colon && i === ' ') {
            if (backslash) {
              str += i;
              backslash = false;
              break;
            }

            if (/\S/.test(str)) {
              argsArray.push(str);
            }

            str = '';
            break;
          }

          if (token) {
            argsArray.push(str);
            str = '';
          }
          str += i;
          token = false;
          break;
      }
    }

    if (/\S/.test(str)) {
      argsArray.push(str);
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
