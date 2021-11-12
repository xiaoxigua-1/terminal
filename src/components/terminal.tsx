import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
} from 'react';
import Console, { ConsoleProp } from './console';
import initCommands from '../util/initCommands';
import CommandManager from '../util/commandManage';

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
        type="text"
        className="opacity-0 absolute z-0"
        value={userInputString}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUserInputString(event.target.value);
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') {
            if (userInputString === 'clear') {
              setConsoleList([]);
              setUserInputString('');
              return;
            }
            const cloneData = [...consoleList];
            const commandReturnInfo = commandManager.runCommand(userInputString, path);
            cloneData.push(
              {
                userInput: userInputString,
                output: commandReturnInfo.output,
                path: commandReturnInfo.path,
              },
            );
            setPath('~');
            setConsoleList(cloneData);
            setUserInputString('');
          }
        }}
      />
      {consoleList.map((value) => (
        <Console userInput={value.userInput} output={value.output} path={value.path} />
      ))}
      <span className="text-green-600">xiaoxigua@xiaoxigua:</span>
      <span className="text-blue-500">{path}</span>
      <span className="pl-2 text-white animate-caret border-r-8 border-white">{userInputString}</span>
    </div>
  );
}

export default Terminal;
