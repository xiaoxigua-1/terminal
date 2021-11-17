import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';
import CurlCommand from './commands/curl';
import EchoCommand from './commands/echo';
import WhoamiCommand from './commands/whoami';
import CdCommand from './commands/fileSystem/cd';
import LsCommand from './commands/fileSystem/ls';
import CatCommand from './commands/fileSystem/cat';

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
    new LsCommand(),
    new CatCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));
}
