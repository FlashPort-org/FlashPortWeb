import { Sprite } from "@flashport/flashport";
import { AEvent, MouseEvent } from "@flashport/flashport";
import { TextField } from "@flashport/flashport";
import { TextFormat } from "@flashport/flashport";
import { MenuEvent } from "./events/MenuEvent";
import { TouchEvent } from "@flashport/flashport";

export class Menu extends Sprite {
  private primitivesTxt: TextField;
  private filtersTxt: TextField;
  private textTxt: TextField;
  private masksTxt: TextField;
  private eventsTxt: TextField;
  private tweensTxt: TextField;
  private threeDTxt: TextField;
  private componentsTxt: TextField;

  private txtArr: TextField[];

  constructor() {
    super();

    this.txtArr = [
      (this.primitivesTxt = new TextField()),
      (this.filtersTxt = new TextField()),
      (this.textTxt = new TextField()),
      (this.masksTxt = new TextField()),
      (this.eventsTxt = new TextField()),
      (this.tweensTxt = new TextField()),
      (this.componentsTxt = new TextField()),
      //(this.threeDTxt = new TextField()),
    ];
    let txtNames: string[] = [
      "Primitives",
      "Filters",
      "Text",
      "Masks",
      "Events",
      "Animation",
      "Components",
      //"3D",
    ];

    let format: TextFormat = new TextFormat("Arial", 16, 0xCCCCCC, true);
    let pos: number = 0;
    let spacing: number = 10;

    for (let i: number = 0; i < this.txtArr.length; i++) {
      let txt: TextField = this.txtArr[i];
      txt.defaultTextFormat = format;
      txt.text = txtNames[i];
      let hitArea: Sprite = new Sprite();
      hitArea.graphics.beginFill(0xffffff, 0);
      hitArea.graphics.drawRect(0, 0, txt.textWidth + 2, txt.textHeight + 2);
      hitArea.addChild(txt);
      hitArea.name = txtNames[i];
      hitArea.x = pos;
      hitArea.buttonMode = true;
      pos += hitArea.width + spacing;
      
      hitArea.addEventListener(MouseEvent.CLICK, this.handleMouseClick);
      this.addChild(hitArea);
    }
  }

  private handleMouseClick = (e: AEvent) => {
    
    this.dispatchEvent(
      new MenuEvent(MenuEvent.MENU_CLICKED, e.currentTarget.name, true)
    );
  };
}
