import { Command } from './Command';

class CommandManager {
  private commands: Command[];

  constructor() {
    this.commands = [];
  }

  addCommand(command: Command) {
    this.commands.push(command);
  }

  runCommand(name: string, args: string): string {
    const searchCommand = this.commands.find((command) => command.name === name);
    if (searchCommand === undefined) {
      return '';
    }
    return searchCommand.run(args.split(' '));
  }
}

export default CommandManager;
