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
        xyz-studio@
        {user}
        :
      </span>
      <span className="text-blue-500 break-all">
        {path}
        $
      </span>
      <span className="text-white pl-2 whitespace-pre-wrap break-all">
        {userInput}
      </span>
      {userInput !== '' ? <br /> : null}
    </div>
  );
}

export default Console;
