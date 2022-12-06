import { Bitmap } from "@fp/flash/display/Bitmap";
import { Loader } from "@fp/flash/display/Loader";
import { Shape } from "@fp/flash/display/Shape";
import { Sprite } from "@fp/flash/display/Sprite";
import { AEvent } from "@fp/flash/events/AEvent";
import { MouseEvent } from "@fp/flash/events/MouseEvent";
import { Matrix } from "@fp/flash/geom/Matrix";
import { Rectangle } from "@fp/flash/geom/Rectangle";
import { URLRequest } from "@fp/flash/net/URLRequest";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";


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


        var tree:Bitmap;
        let ld:Loader = new Loader();
        ld.contentLoaderInfo.addEventListener(AEvent.COMPLETE, (e:AEvent):void =>
        {
            tree = ld.contentLoaderInfo.content as Bitmap;
            tree.scaleX = tree.scaleY = .6;
            tree.x = (this.width - tree.width) / 2;
            tree.y = (this.height - tree.height) / 2;

            this.masker = new Sprite();
            this.masker.graphics.beginFill(0x000000);
            this.masker.graphics.drawCircle(0, 0, 150);
            this.masker.x = this.width / 2;
            this.masker.y = this.height / 2;
            this.addChild(this.masker);
            tree.mask = this.masker;

            this.addChild(tree);

            this.addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOver);
        });
        ld.load(new URLRequest("assets/tree.png"));


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
        this.masker.startDrag(true, new Rectangle(150, 150, 200, 200));
        this.addEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
    }

    private handleMouseOut = (e:MouseEvent):void =>
    {
        this.removeEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
        this.stopDrag();
        this.masker.x = this.masker.y = 250;
    }
}