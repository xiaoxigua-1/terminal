import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';

export default function initCommands(
  commandsManager: CommandsManager,
): () => void {
  commandsManager.addCommand(new InfoCommand());
  commandsManager.addCommand(new ExitCommand());

  return () => null;
}
