import { Sprite } from "@flashport/flashport";
import { Matrix } from "@flashport/flashport";
import { TextField } from "@flashport/flashport";
import { TextFieldType } from "@flashport/flashport";
import { TextFormat } from "@flashport/flashport";

export class Text extends Sprite {
  constructor() {
    super();

    this.name = "Text Panel";

    let radians: number = (Math.PI / 180) * 45;
    let btMat: Matrix = new Matrix();
    btMat.createGradientBox(500, 500, radians);

    this.graphics.lineStyle(3, 0x00a3d9);
    this.graphics.beginGradientFill(
      "linear",
      [0x464646, 0xffffff],
      [0.3, 0.43],
      [0, 255],
      btMat
    );
    this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

    let fmt1: TextFormat = new TextFormat("Arial", 40, 0xffffff, false);
    let txt1: TextField = new TextField();
    txt1.defaultTextFormat = fmt1;
    txt1.text = "The dingo ate your baby";
    txt1.x = 30;
    txt1.y = 30;
    this.addChild(txt1);

    let fmt2: TextFormat = new TextFormat("Arial", 40, 0xffffff, true);
    let txt2: TextField = new TextField();
    txt2.defaultTextFormat = fmt2;
    txt2.text = "The dingo ate your baby";
    txt2.x = (this.width - txt2.textWidth) / 2;
    txt2.y = 110;
    this.addChild(txt2);

    let fmt3: TextFormat = new TextFormat("Arial", 40, 0xffffff, false, true);
    let txt3: TextField = new TextField();
    txt3.defaultTextFormat = fmt3;
    txt3.text = "The dingo ate your baby";
    txt3.x = (this.width - txt3.textWidth) / 2;
    txt3.y = 190;
    this.addChild(txt3);

    let fmt4: TextFormat = new TextFormat("Arial", 40, 0xffffff, false, false);
    let txt4: TextField = new TextField();
    txt4.type = TextFieldType.INPUT;
    txt4.border = true;
    txt4.borderColor = 0x000000;
    txt4.name = "My Input Text";
    txt4.defaultTextFormat = fmt4;
    txt4.text = "Input no background";
    txt4.width = 370;
    txt4.height = txt4.textHeight + 2;
    txt4.x = (this.width - txt4.textWidth) / 2;
    txt4.y = 270;
    this.addChild(txt4);

    let fmt5: TextFormat = new TextFormat("Arial", 40, 0xffffff, false, false);
    let txt5: TextField = new TextField();
    txt5.type = TextFieldType.INPUT;
    txt5.backgroundColor = 0x000000;
    txt5.background = true;
    txt5.defaultTextFormat = fmt5;
    txt5.text = "Input with background";
    txt5.width = 400;
    txt5.height = txt5.textHeight + 6;
    txt5.x = (this.width - txt5.textWidth) / 2;
    txt5.y = 350;
    this.addChild(txt5);

    let fmt: TextFormat = new TextFormat("Arial", 22, 0xffffff);
    let txt: TextField = new TextField();
    txt.defaultTextFormat = fmt;
    txt.text = "Dynamic, Input with Background and Font Loading";
    txt.y = this.height + 20;
    txt.x = (this.width - txt.textWidth) / 2;
    this.addChild(txt);
  }
}
