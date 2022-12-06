import { Bitmap } from "@fp/flash/display/Bitmap";
import { Loader } from "@fp/flash/display/Loader";
import { Sprite } from "@fp/flash/display/Sprite";
import { AEvent } from "@fp/flash/events";
import { DropShadowFilter } from "@fp/flash/filters";
import { Matrix } from "@fp/flash/geom/Matrix";
import { URLLoader } from "@fp/flash/net/URLLoader";
import { URLRequest } from "@fp/flash/net/URLRequest";
import { TextField, TextFormat } from "@fp/flash/text";


export class Header extends Sprite
{
    private mat:Matrix;
    private degrees:number = 0;
    
    constructor()
    {
        super();

        this.update();

        let tf:TextFormat = new TextFormat("Arial", 30, 0xFFFFFF, true);
        let title:TextField = new TextField();
        title.defaultTextFormat = tf;
        title.text = "FlashPort";
        title.x = 75;
        title.y = 15;
        //title.filters = [new DropShadowFilter()];
        this.addChild(title);

        var flashMan:Bitmap;
        let ld:Loader = new Loader();
        ld.contentLoaderInfo.addEventListener(AEvent.COMPLETE, (e:AEvent):void =>
        {
            flashMan = ld.contentLoaderInfo.content as Bitmap;
            flashMan.scaleX = flashMan.scaleY = .5;
            flashMan.x = 10;
            flashMan.y = 8;
            this.addChild(flashMan);
        });
        ld.load(new URLRequest("assets/FlashPortMan-Med.png"));

        this.addEventListener(AEvent.ENTER_FRAME, this.update);
    }

    private update = (e:AEvent = null):void =>
    {
        let radians:number = Math.PI / 180 * this.degrees;
        let lineMat:Matrix = new Matrix();
        lineMat.createGradientBox(this.stage.stageWidth, 100, Math.PI / 180 * 90)
        this.mat = new Matrix();
        this.mat.createGradientBox(this.stage.stageWidth, 100, radians);
        this.graphics.clear();
        this.graphics.lineStyle(5);
        this.graphics.lineGradientStyle("linear", [0x464646, 0xFFFFFF], [1,1], [0, 255], lineMat);
        this.graphics.beginGradientFill("linear", [0x00A3D9, 0xFFFFFF, 0x00A3D9], [1,1,1], [0, 127, 255], this.mat);
        this.graphics.drawRoundRectComplex(1, 0, this.stage.stageWidth - 2, 100, 0, 0, 10, 10);

        this.degrees += .3;
        if (this.degrees > 360) this.degrees = 0;
    }

}