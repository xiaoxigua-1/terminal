import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useEffect,
  useRef,
} from 'react';
import Console from './console';
import initCommands from '../util/initCommands';
import CommandManager from '../util/CommandManage';

const commandManager = new CommandManager();
/**
 * terminal component
 * @return {JSX.Element}
 */
function Terminal(): JSX.Element {
  const userInputRef = useRef<HTMLInputElement>(null);
  const [userInputString, setUserInputString] = useState('');
  const [path] = commandManager.usePath();
  const [consoleList, setConsoleList] = commandManager.useConsole();
  const [user] = commandManager.useUser();
  const [userInputLog, setUserInputLog] = useState<string[]>([]);
  const [userInputLogCount, setUserInputLogCount] = useState(-1);
  const [userSelect, setUserSelect] = useState({
    end: 0,
    start: 0,
  });
  const [hint, setHint] = useState(false);
  const [control, setControl] = useState(false);

  useEffect(() => {
    const app = window;
    app?.scrollTo(0, document.body.scrollHeight);
  });

  useEffect(() => {
    const input = userInputRef.current;

    setUserInputString(
      userInputLog[userInputLogCount] ? userInputLog[userInputLogCount] : '',
    );

    if (input !== null) {
      if (input.selectionEnd !== null) {
        input.selectionEnd = userInputString.length;
        input.selectionStart = userInputString.length;
        setUserSelect({
          end: userInputString.length,
          start: userInputString.length,
        });
      }
    }
  }, [userInputLogCount]);

  // 指令初始化
  useEffect(() => {
    initCommands(commandManager);
  }, []);

  // 更新光標位置
  const select = () => {
    if (userInputRef.current !== null) {
      const input = userInputRef.current;
      setUserSelect({
        end: input.selectionEnd ? input.selectionEnd : 0,
        start: input.selectionStart ? input.selectionStart : 0,
      });
    }
  };

  return (
    <div
      className="w-full min-h-screen bg-black scr text-xl cursor-text text-white"
      aria-hidden="true"
      onClick={() => {
        document.getElementById('userInput')?.focus();
      }}
    >
      {consoleList.map((value, index) => (
        <span key={index.toString()} className="whitespace-pre-wrap break-all">{value}</span>
      ))}
      <input
        id="userInput"
        className="opacity-0 left-60 fixed pointer-events-none"
        value={userInputString}
        ref={userInputRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setUserInputString(event.target.value);
          setHint(false);
          select();
        }}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Control' && control) setControl(false);
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          (async () => {
            if (e.key === 'Control') setControl(true);
            if (control && e.key === 'c') {
              setConsoleList([...consoleList, Console({ userInput: `${userInputString}^C`, path, user })]);
              setUserInputString('');
            }

            if (e.key === 'Enter') {
              if (!userInputLog.includes(userInputString) && /\s/.test(userInputString)) {
                setUserInputLog([userInputString, ...userInputLog]);
              }

              // user run command
              await commandManager.runCommand(userInputString, path);

              setUserInputString('');
              setUserInputLogCount(-1);
            } else if (e.key === 'ArrowUp' && userInputLogCount + 1 < userInputLog.length) {
              setUserInputLogCount(userInputLogCount + 1);
            } else if (e.key === 'ArrowDown') {
              if (userInputLogCount - 1 >= 0) {
                setUserInputLogCount(userInputLogCount - 1);
              } else {
                setUserInputString('');
                setUserInputLogCount(-1);
              }
            } else if (e.key === 'Tab') {
              e.preventDefault();
              if (/\S/.test(userInputString)) {
                const commands = commandManager.commands.filter(
                  (command) => new RegExp(`^${userInputString}`).test(
                    command.name,
                  ),
                );
                // 指令不只一個時
                if (commands.length > 1) {
                  const cloneData = [...consoleList];

                  if (hint) {
                    cloneData.push(Console(
                      {
                        userInput: userInputString,
                        path,
                        user: commandManager.user,
                      },
                    ));

                    cloneData.push(commands.map((command) => command.name).join('\n'));
                  } else {
                    setHint(true);
                  }

                  setConsoleList(cloneData);
                } else if (commands.length === 1) {
                  // 只有一個時直接完成指令
                  setUserInputString(commands[0].name);
                  setHint(false);
                }
              }
            }
          })();
        }}
        onSelect={select}
      />
      <div className="z-10">
        <span className="text-green-600 break-all">
          xiaoxigua@
          {user}
          :
        </span>
        <span className="text-blue-500 break-all">
          {path}
        </span>
        <span className="text-gray-100">$</span>
        <span className="text-white relative w-auto break-all">
          <span className="pl-2 text-white relative w-auto break-all whitespace-pre-wrap">
            {userInputString.slice(0, userSelect.start)}
          </span>
          <span className="animate-caret bg-white w-auto min-w-2  bottom-0 text-black whitespace-pre-wrap">
            {userInputString.slice(userSelect.start, userSelect.end + 1) || ' '}
          </span>
          <span className="whitespace-pre-wrap break-all">
            {userInputString.slice(userSelect.end + 1, userInputString.length)}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Terminal;
