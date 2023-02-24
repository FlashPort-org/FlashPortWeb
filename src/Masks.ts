import { Bitmap, FPConfig } from "@flashport/flashport";
import { Loader } from "@flashport/flashport";
import { Shape } from "@flashport/flashport";
import { Sprite } from "@flashport/flashport";
import { AEvent } from "@flashport/flashport";
import { MouseEvent } from "@flashport/flashport";
import { Matrix } from "@flashport/flashport";
import { Rectangle } from "@flashport/flashport";
import { URLRequest } from "@flashport/flashport";
import { TextField } from "@flashport/flashport";
import { TextFormat } from "@flashport/flashport";


export class Masks extends Sprite
{
    private masker:Sprite;
    
    constructor() 
    {
        super();

        let radians:number = Math.PI / 180 * 45;
        let btMat:Matrix = new Matrix();
        btMat.createGradientBox(500, 500, radians)
        
        this.graphics.lineStyle(3, 0x00A3D9);
        this.graphics.beginGradientFill("linear", [0x464646, 0xFFFFFF], [.3,.43], [0, 255], btMat);
        this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

        var tree:Bitmap = new Bitmap(FPConfig.images['tree']);
        
        tree.x = (this.width - tree.width) / 2;
        tree.y = (this.height - tree.height) / 2;

        this.masker = new Sprite();
        this.masker.graphics.beginFill(0x000000, .75);
        this.masker.graphics.drawCircle(0, 0, 150);
        this.masker.x = this.width / 2;
        this.masker.y = this.height / 2;
        this.addChild(this.masker);
        tree.mask = this.masker;

        this.addChild(tree);
        this.addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOver);
       


        let fmt:TextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        let txt:TextField = new TextField();
        txt.defaultTextFormat = fmt;
        txt.text = "Masking with any shape.";
        txt.y = this.height + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);
    }

    private handleMouseOver = (e:MouseEvent):void =>
    {
        this.masker.startDrag(true, new Rectangle(155, 155, 190, 190));
        this.addEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
    }

    private handleMouseOut = (e:MouseEvent):void =>
    {
        this.removeEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
        this.stopDrag();
        this.masker.x = this.masker.y = 250;
    }
}