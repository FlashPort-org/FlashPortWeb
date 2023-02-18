import { Bitmap } from "@fp/flash/display/Bitmap";
import { Loader } from "@fp/flash/display/Loader";
import { Sprite } from "@fp/flash/display/Sprite";
import { AEvent } from "@fp/flash/events/AEvent";
import { MouseEvent } from "@fp/flash/events/MouseEvent";
import { DropShadowFilter } from "@fp/flash/filters";
import { Matrix } from "@fp/flash/geom/Matrix";
import { URLLoader } from "@fp/flash/net/URLLoader";
import { URLRequest } from "@fp/flash/net/URLRequest";
import { TextField, TextFormat } from "@fp/flash/text";
import { FlashPort } from "@fp/FlashPort";


export class Header extends Sprite
{
    private mat:Matrix;
    private degrees:number = 0;
    private githubBtn:Sprite;
    
    constructor()
    {
        super();

        let tf:TextFormat = new TextFormat("Arial", 30, 0xFFFFFF, true);
        let title:TextField = new TextField();
        title.defaultTextFormat = tf;
        title.text = "FlashPort";
        title.x = 75;
        title.y = 15;
        //title.filters = [new DropShadowFilter()];
        this.addChild(title);

        tf = new TextFormat("Arial", 13, 0x464646, true);
        let desc:TextField = new TextField();
        desc.defaultTextFormat = tf;
        desc.text = "2D graphics engine for the web.";
        desc.x = 75;
        desc.y = 60;
        this.addChild(desc);


        var flashMan:Bitmap = new Bitmap(FlashPort.images['FlashPortMan-Med']);
        flashMan.scaleX = flashMan.scaleY = .5;
        flashMan.x = 10;
        flashMan.y = 8;
        this.addChild(flashMan);

        let github:Bitmap = new Bitmap(FlashPort.images["ForkMeGithub"]);
        this.githubBtn = new Sprite();
        this.githubBtn.graphics.beginFill(0xFFFFFF, 0);
        this.githubBtn.graphics.drawRect(-90, 0, 90, 100);
        github.height = 100;
        github.scaleX = github.scaleY;
        github.rotation = 90;
        this.githubBtn.addChild(github);
        this.githubBtn.y = 2;
        this.githubBtn.x = this.stage.stageWidth - 4;
        this.githubBtn.buttonMode = true;
        this.githubBtn.addEventListener(MouseEvent.CLICK, (e:MouseEvent) => {
            window.location = "https://github.com/FlashPort-com/FlashPort";
        });
        
        this.addChild(this.githubBtn);

        this.update();

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

        this.githubBtn.x = this.stage.stageWidth - 4;

        this.degrees += .3;
        if (this.degrees > 360) this.degrees = 0;
    }

}