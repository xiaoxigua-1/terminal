export interface ConsoleProp {
  userInput: string;
  output: string;
}

/**
 * Console component
 * @return{JSX.Element}
 */
function Console({ userInput, output }: ConsoleProp): JSX.Element {
  return (
    <div>
      <span className="text-green-600">xiaoxigua@xiaoxigua: </span>
      <span className="text-white">{userInput}</span>
      <br />
      {output}
    </div>
  );
}

export default Console;
