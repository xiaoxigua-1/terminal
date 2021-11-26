export interface ConsoleProp {
  userInput: string;
  path: string;
  user: string;
}

/**
 * Console component
 * @return{JSX.Element}
 */
function Console({
  userInput,
  path,
  user,
}: ConsoleProp): JSX.Element {
  return (
    <div>
      <span className="text-green-600 break-all">
        xiaoxigua@
        {user}
        :
      </span>
      <span className="text-blue-500 break-all">
        {path}
      </span>
      <span className="text-gray-100">$</span>
      <span className="pl-2 text-white break-all whitespace-pre-wrap">
        {userInput}
      </span>
      {userInput !== '' ? <br /> : null}
    </div>
  );
}

export default Console;
