import Node from './Node';
import CommandManager from '../CommandManage';

export default class AndNode extends Node {
  constructor(right: Node, left: Node, args: string[]) {
    super(left, right, args);
  }

  async* run(path: string, commandManager: CommandManager) {
    const right = this.right.run(this.left.path, commandManager);
    let commandReturnInfo = await right.next();

    while (!commandReturnInfo.done) {
      yield commandReturnInfo.value;
      // eslint-disable-next-line no-await-in-loop
      commandReturnInfo = await right.next();
    }
  }
}
