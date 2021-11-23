import Node from './Node';
import CommandManager from '../CommandManage';

export default class OrNode extends Node {
  constructor(right: Node, args: string[]) {
    super(args);
    this.right = right;
  }

  async* run(path: string, commandManager: CommandManager) {
    if (this.left.error) {
      const right = this.right.init(this.left.path, commandManager);
      let commandReturnInfo = await right.next();

      while (!commandReturnInfo.done) {
        yield commandReturnInfo.value;
        // eslint-disable-next-line no-await-in-loop
        commandReturnInfo = await right.next();
      }
    }
  }
}
