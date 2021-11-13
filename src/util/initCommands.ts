import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';
import CurlCommand from './commands/curl';

export default function initCommands(
  commandsManager: CommandsManager,
): () => void {
  const commands = [
    new InfoCommand(),
    new ExitCommand(),
    new CurlCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));

  return () => null;
}
