import { Sprite } from "@fp/flash/display/Sprite";
import { Matrix } from "@fp/flash/geom/Matrix";
import { TextField } from "@fp/flash/text/TextField";
import { TextFieldType } from "@fp/flash/text/TextFieldType";
import { TextFormat } from "@fp/flash/text/TextFormat";


export class Text extends Sprite
{
    constructor()
    {
        super();

        let radians:number = Math.PI / 180 * 45;
        let btMat:Matrix = new Matrix();
        btMat.createGradientBox(500, 500, radians)
        
        this.graphics.lineStyle(3, 0x00A3D9);
        this.graphics.beginGradientFill("linear", [0x464646, 0xFFFFFF], [.3,.43], [0, 255], btMat);
        this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

        let fmt1:TextFormat = new TextFormat('Arial', 40, 0xFFFFFF, false);
        let txt1:TextField = new TextField();
        txt1.defaultTextFormat = fmt1;
        txt1.text = "The dingo ate your baby";
        txt1.x = 30;
        txt1.y = 30;
        this.addChild(txt1);

        let fmt2:TextFormat = new TextFormat('Arial', 40, 0xFFFFFF, true);
        let txt2:TextField = new TextField();
        txt2.defaultTextFormat = fmt2;
        txt2.text = "The dingo ate your baby";
        txt2.x = (this.width - txt2.textWidth) / 2;
        txt2.y = 100;
        this.addChild(txt2);

        let fmt3:TextFormat = new TextFormat('Arial', 40, 0xFFFFFF, false, true);
        let txt3:TextField = new TextField();
        txt3.defaultTextFormat = fmt3;
        txt3.text = "The dingo ate your baby";
        txt3.x = (this.width - txt3.textWidth) / 2;
        txt3.y = 170;
        this.addChild(txt3);

        let fmt4:TextFormat = new TextFormat('Arial', 40, 0xFFFFFF, false, false);
        let txt4:TextField = new TextField();
        txt4.type = TextFieldType.INPUT;
        txt4.defaultTextFormat = fmt4;
        txt4.text = "The dingo ate your baby";
        txt4.width = 440;
        txt4.height = txt4.textHeight + 2;
        txt4.x = (this.width - txt4.textWidth) / 2;
        txt4.y = 240;
        this.addChild(txt4);

        let fmt5:TextFormat = new TextFormat('Arial', 40, 0xFFFFFF, false, false);
        let txt5:TextField = new TextField();
        txt5.type = TextFieldType.INPUT;
        txt5.backgroundColor = 0x000000;
        txt5.background = true;
        txt5.defaultTextFormat = fmt5;
        txt5.text = "The dingo ate your baby";
        txt5.width = 440;
        txt5.height = txt5.textHeight + 6;
        txt5.x = (this.width - txt5.textWidth) / 2;
        txt5.y = 310;
        this.addChild(txt5);





        let fmt:TextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        let txt:TextField = new TextField();
        txt.defaultTextFormat = fmt;
        txt.text = "Dynamic, Input with Background and Font Loading";
        txt.y = this.height + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);
    }
}