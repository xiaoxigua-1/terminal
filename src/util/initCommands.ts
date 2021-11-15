import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';
import CurlCommand from './commands/curl';
import EchoCommand from './commands/echo';
import WhoamiCommand from './commands/whoami';

export default function initCommands(
  commandsManager: CommandsManager,
): () => void {
  const commands = [
    new InfoCommand(),
    new ExitCommand(),
    new CurlCommand(),
    new EchoCommand(),
    new WhoamiCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));

  return () => null;
}
