export interface ConsoleProp {
  userInput: string;
  path: string;
  output: string | JSX.Element;
}

/**
 * Console component
 * @return{JSX.Element}
 */
function Console({ userInput, output, path }: ConsoleProp): JSX.Element {
  return (
    <div>
      <span className="text-green-600">xiaoxigua@xiaoxigua:</span>
      <span className="text-blue-500">{path}</span>
      <span className="text-white pl-2  ">{userInput}</span>
      {userInput !== '' ? <br /> : null}
      <span className="text-white">{output}</span>
    </div>
  );
}

export default Console;
