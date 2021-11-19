export interface ConsoleProp {
  userInput: string;
  path: string;
  output: string | JSX.Element;
  user: string;
}

/**
 * Console component
 * @return{JSX.Element}
 */
function Console({
  userInput,
  output,
  path,
  user,
}: ConsoleProp): JSX.Element {
  return (
    <div>
      <span className="text-green-600 break-all">
        xyz-studio@
        {user}
        :
      </span>
      <span className="text-blue-500 break-all">
        {path}
        $
      </span>
      <span className="text-white pl-2 whitespace-pre-line break-all">
        {userInput.replaceAll(' ', '\u00a0')}
      </span>
      {userInput !== '' ? <br /> : null}
      <span className="text-white whitespace-pre-line break-all">{output}</span>
    </div>
  );
}

export default Console;
