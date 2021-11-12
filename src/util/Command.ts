export interface CommandProp {
  name: string;
}

export class Command {
  private name: string;

  constructor({ name }: CommandProp) {
    this.name = name;
  }
}
