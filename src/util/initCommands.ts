import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';
import CurlCommand from './commands/curl';
import EchoCommand from './commands/echo';
import WhoamiCommand from './commands/whoami';
import CdCommand from './commands/fileSystem/cd';

export default function initCommands(
  commandsManager: CommandsManager,
) {
  const commands = [
    new InfoCommand(),
    new ExitCommand(),
    new CurlCommand(),
    new EchoCommand(),
    new WhoamiCommand(),
    new CdCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));
}
