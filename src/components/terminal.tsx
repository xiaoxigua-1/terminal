import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
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
  const userInputRef = useRef<HTMLInputElement>(null);
  const [userInputString, setUserInputString] = useState('');
  const [path, setPath] = useState('~');
  const [consoleList, setConsoleList] = useState<ConsoleProp[]>([]);
  const [userInputLog, setUserInputLog] = useState<string[]>([]);
  const [userInputLogCount, setUserInputLogCount] = useState(-1);

  useEffect(() => {
    const app = document.getElementById('App');
    app?.scrollTo(0, app.scrollHeight);
  });

  useEffect(() => {
    const input = userInputRef.current;
    if (input !== null) {
      if (input.selectionEnd !== null) {
        input.selectionEnd = userInputString.length;
        input.selectionStart = userInputString.length;
      }
    }
  }, [userInputString]);

  useEffect(() => {
    setUserInputString(userInputLog[userInputLogCount] ? userInputLog[userInputLogCount] : '');
  }, [userInputLogCount]);

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
        ref={userInputRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUserInputString(event.target.value.replaceAll(' ', '\u00a0'));
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') {
            if (!userInputLog.includes(userInputString) && userInputString !== '') {
              setUserInputLog([userInputString, ...userInputLog]);
            }
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
            setUserInputLogCount(-1);
          } else if (e.key === 'ArrowUp' && userInputLogCount + 1 < userInputLog.length) {
            setUserInputLogCount(userInputLogCount + 1);
          } else if (e.key === 'ArrowDown' && userInputLogCount - 1 >= 0) {
            setUserInputLogCount(userInputLogCount - 1);
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
      <span className="pl-2 text-white relative">
        {userInputString}
        <span className="animate-caret bg-white w-2 h-4 inline-block" />
      </span>
    </div>
  );
}

export default Terminal;
