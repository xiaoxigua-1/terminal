import { ChangeEvent, useState, KeyboardEvent } from 'react';
import Console, { ConsoleProp } from './console';

/**
 * @return {JSX.Element}
 */
function Terminal(): JSX.Element {
  const [userInputString, setUserInputString] = useState('');
  const [consoleList, setConsoleList] = useState<ConsoleProp[]>([]);

  return (
    <div className="w-screen min-h-full bg-black scr">
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
            const cloneData = [...consoleList];

            cloneData.push(
              { userInput: userInputString, output: 'asd' },
            );
            setConsoleList(cloneData);
            setUserInputString('');
          }
        }}
      />
      {consoleList.map((value) => (
        <Console userInput={value.userInput} output={value.output} />
      ))}
      <div
        className="text-white z-10"
        aria-hidden="true"
        onClick={() => {
          document.getElementById('userInput')?.focus();
        }}
      >
        <span className="text-green-600">xiaoxigua@xiaoxigua: </span>
        {userInputString}
      </div>
    </div>
  );
}

export default Terminal;
