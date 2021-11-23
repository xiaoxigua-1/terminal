import Node from './commandNodes/Node';
import AndNode from './commandNodes/And';
import OrNode from './commandNodes/Or';

export default class CommandParser {
  static parser(args: string[]) {
    const nodes: Node[] = [];
    let startIndex = 0;
    let endIndex = 0;

    while (endIndex < args.length) {
      switch (args[endIndex]) {
        case '&&':
          nodes.push(new AndNode(new Node(args), args.slice(startIndex, endIndex)));
          startIndex = endIndex + 1;
          break;
        case '||':
          nodes.push(new OrNode(new Node(args), args.slice(startIndex, endIndex)));
          startIndex = endIndex + 1;
          break;
        default:
          if (endIndex === args.length - 1) {
            nodes.push(new Node(args.slice(startIndex, endIndex + 1)));
          }
          break;
      }

      endIndex += 1;
    }

    let node = nodes[nodes.length - 1];

    for (let i = nodes.length - 2; i >= 0; i -= 1) {
      nodes[i].right = node;
      node = nodes[i];
    }

    return node;
  }
}
