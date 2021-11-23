import { useState } from 'react';
import Command from './Command';
import Help from '../components/help';
import CommandParser from './CommandParser';
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
    let cloneConsole = [...this._console];
    cloneConsole.push(Console({
      userInput: args,
      path: inputPath,
      user: this._user,
    }));
    this._setConsole([...cloneConsole]);

    if (/^\s+$/.test(args) || args === '') {
      return;
    }

    const argsArray = this.commandHandler(args);
    const abstractSyntaxTree = CommandParser.parser(argsArray);
    const info = abstractSyntaxTree.init(inputPath, this);
    let commandInfo = await info.next();

    while (!commandInfo.done) {
      cloneConsole.push(commandInfo.value.output);
      if (this._clear) {
        cloneConsole = [];
        this._clear = false;
      }
      this._setConsole([...cloneConsole]);
      // eslint-disable-next-line no-await-in-loop
      commandInfo = await info.next();
    }
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
