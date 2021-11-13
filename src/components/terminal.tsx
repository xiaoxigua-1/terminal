import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import Console, { ConsoleProp } from './console';
import initCommands from '../util/initCommands';
import CommandManager from '../util/commandManage';
import { CommandReturnInfo } from '../util/CommandReturnInfo';

const commandManager = new CommandManager();
/**
 * terminal component
 * @return {JSX.Element}
 */
function Terminal(): JSX.Element {
  const [userInputString, setUserInputString] = useState('');
  const [path, setPath] = useState('~');
  const [consoleList, setConsoleList] = useState<ConsoleProp[]>([]);

  useEffect(() => {
    const app = document.getElementById('App');
    app?.scrollTo(0, app.scrollHeight);
  });

  useEffect(() => {
    initCommands(commandManager);
  }, []);

  return (
    <div
      className="w-screen min-h-full bg-black scr"
      aria-hidden="true"
      onClick={() => {
        document.getElementById('userInput')?.focus();
      }}
    >
      <input
        id="userInput"
        className="opacity-0 absolute z-0 w-0 h-0"
        value={userInputString}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUserInputString(event.target.value);
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            const cloneData = [...consoleList];
            let commandReturnInfo: CommandReturnInfo;
            switch (true) {
              case userInputString.split(' ')[0] === 'clear':
                setConsoleList([]);
                setUserInputString('');
                return;
              case userInputString === '':
                commandReturnInfo = {
                  output: '',
                  path,
                };
                break;
              default:
                commandReturnInfo = commandManager.runCommand(userInputString, path);
                break;
            }
            cloneData.push(
              {
                userInput: userInputString,
                output: commandReturnInfo.output,
                path: commandReturnInfo.path,
              },
            );
            setPath(commandReturnInfo.path);
            setConsoleList(cloneData);
            setUserInputString('');
          }
        }}
      />
      {consoleList.map((value, index) => (
        <Console
          key={index.toString()}
          userInput={value.userInput}
          output={value.output}
          path={value.path}
        />
      ))}
      <span className="text-green-600">xiaoxigua@xiaoxigua:</span>
      <span className="text-blue-500">{path}</span>
      <span className="pl-2 text-white animate-caret border-r-8 border-white">
        {userInputString.replaceAll(' ', '\u00a0')}
      </span>
    </div>
  );
}

export default Terminal;
