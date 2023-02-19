import { AEvent } from "@flashport/flashport";

export class MenuEvent extends AEvent {
  public static readonly MENU_CLICKED: string = "MENU_CLICKED";

  public title: string = "";

  constructor(type: string, title: string, bubbles: boolean = true) {
    super(type, bubbles, false);
    this.title = title;
  }

  public clone(): AEvent {
    return new MenuEvent(this.type, this.title, this.bubbles);
  }
}
