import { PathData } from '../util/commands/fileSystem/data/returnPathData';
import Folder from '../util/commands/fileSystem/node/folder';

export default function Ls(nodes: Array<PathData | null>, userInputPath: string[]): JSX.Element {
  return (
    <div>
      {
        // eslint-disable-next-line react/destructuring-assignment
        nodes.map((node, index) => (node ? (
          <div
            key={index.toString()}
          >
            {
              // eslint-disable-next-line react/destructuring-assignment
              (nodes.length > 1) ? `${node?.path.map((p) => p.name).join('/')}:\n` : ''
            }
            <div className="flex">
              {(node?.path[node?.path.length - 1] as Folder).nodes.map((p) => (
                <div className="flex-1 min-w-2">
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            key={index.toString()}
          >
            {
              // eslint-disable-next-line react/destructuring-assignment
              `ls: ${userInputPath[index]}: No such file or directory`
            }
          </div>
        )
        ))
      }
    </div>
  );
}
