/* eslint-disable react/destructuring-assignment */
import Command from '../util/Command';

function Help(infoList: Command[]): JSX.Element {
  return (
    <div>
      {infoList.map((value) => (
        <div key={value.name}>
          <span>{`${value.name}  ${value.info}`}</span>
        </div>
      ))}
    </div>
  );
}

export default Help;
