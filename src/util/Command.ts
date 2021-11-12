export interface CommandProp {
  name: string;
}

export abstract class Command {
  public name: string;

  constructor({ name }: CommandProp) {
    this.name = name;
  }

  public run(args: string[]): string {
    return args.join('');
  }
}
