import axios from 'axios';
import CommandsManager from './CommandManage';
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
import TouchCommand from './commands/fileSystem/touch';
import RmCommand from './commands/fileSystem/rm';
import HelpCommand from './commands/help';
import { Project } from './data/project';
import fileTree, { make } from './commands/fileSystem/tree';

export default function initCommands(
  commandsManager: CommandsManager,
) {
  // load commands
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
    new TouchCommand(),
    new RmCommand(),
    new HelpCommand(),
  ];

  axios.get<Project[]>('https://api.github.com/users/xiaoxigua-1/repos')
    .then((response) => {
      const { data } = response;
      // eslint-disable-next-line no-restricted-syntax
      for (const project of data) {
        // eslint-disable-next-line camelcase
        const {
          name,
          // eslint-disable-next-line camelcase
          full_name,
          // eslint-disable-next-line camelcase
          html_url,
          // eslint-disable-next-line camelcase
          stargazers_count,
          fork,
        } = project;

        if (!fork) {
          // eslint-disable-next-line camelcase
          const text = `repo name: ${full_name}\nURL:${html_url}\nStars: ${stargazers_count}`;
          // eslint-disable-next-line camelcase
          make(['home', 'xiaoxigua', 'project', name], fileTree.nodes, 0, false, commandsManager.user, 'File', text);
        }
      }
    });

  commands.map((value) => commandsManager.addCommand(value));
}
