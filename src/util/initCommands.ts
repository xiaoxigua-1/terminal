import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';

export default function initCommands(
  commandsManager: CommandsManager,
): () => void {
  const commands = [
    new InfoCommand(),
    new ExitCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));

  return () => null;
}
