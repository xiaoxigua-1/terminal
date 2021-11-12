import CommandsManager from './commandManage';
import InfoCommand from './commands/info';

export default function initCommands(
  commandsManager: CommandsManager,
): () => void {
  commandsManager.addCommand(new InfoCommand());

  return () => null;
}
