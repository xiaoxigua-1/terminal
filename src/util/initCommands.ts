import CommandsManager from './commandManage';
import InfoCommand from './commands/info';
import ExitCommand from './commands/exit';
import CurlCommand from './commands/curl';
import EchoCommand from './commands/echo';
import WhoamiCommand from './commands/whoami';
import CdCommand from './commands/fileSystem/cd';
import LsCommand from './commands/fileSystem/ls';
import CatCommand from './commands/fileSystem/cat';
import PwdCommand from './commands/fileSystem/pwd';
import MkdirCommand from './commands/fileSystem/mkdir';
import ClearCommand from './commands/clear';
import VimCommand from './commands/vim';
import FindCommand from './commands/fileSystem/find';

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
    new PwdCommand(),
    new MkdirCommand(),
    new ClearCommand(),
    new VimCommand(),
    new FindCommand(),
  ];

  commands.map((value) => commandsManager.addCommand(value));
}
