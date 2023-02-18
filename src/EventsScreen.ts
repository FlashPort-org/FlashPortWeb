import { Bitmap } from "@fp/flash/display/Bitmap";
import { BitmapData } from "@fp/flash/display/BitmapData";
import { Loader } from "@fp/flash/display/Loader";
import { Sprite } from "@fp/flash/display/Sprite";
import { AEvent } from "@fp/flash/events/AEvent";
import { KeyboardEvent } from "@fp/flash/events/KeyboardEvent";
import { MouseEvent } from "@fp/flash/events/MouseEvent";
import { Matrix } from "@fp/flash/geom/Matrix";
import { URLRequest } from "@fp/flash/net/URLRequest";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";
import { Keyboard } from "@fp/flash/ui/Keyboard";
import { FlashPort } from "@fp/FlashPort";


export class EventsScreen extends Sprite
{
    private images:Sprite[] = [];
    private coordsTxt:TextField;

    constructor()
    {
        super();

        let radians:number = Math.PI / 180 * 45;
        let btMat:Matrix = new Matrix();
        btMat.createGradientBox(500, 500, radians)
        
        this.graphics.lineStyle(3, 0x00A3D9);
        this.graphics.beginGradientFill("linear", [0x464646, 0xFFFFFF], [.3,.43], [0, 255], btMat);
        this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);
        
        let bmd:BitmapData = new Bitmap(FlashPort.images["FlashPortMan-Med"]).bitmapData;
        let pos:number = 1;
        let padding:number = 500 / 3;
        for (let i:number = 1; i <= 6; i++)
        {
            let hitArea:Sprite = new Sprite();
            let img:Bitmap = new Bitmap(bmd.clone());
            img.scaleX = img.scaleY = .8;
            img.x = -img.width/2;
            img.y = -img.height/2;
            hitArea.graphics.beginFill(0xFFFFFF, 0);
            hitArea.graphics.drawRect(-img.width/2, -img.height/2, img.width, img.height);
            hitArea.addChild(img);
            hitArea.buttonMode = true;

            hitArea.x = (pos * padding) - (padding / 2);
            hitArea.y = (i <= 3) ? (hitArea.height/2) + 40 : 500 - (hitArea.height/2) - 40;
            this.images.push(hitArea);
            this.addChild(hitArea);
            
            pos++;

            if (i % 3 == 0) pos = 1;
        }

        let fmt:TextFormat = new TextFormat('Arial', 16);

        let txt1:TextField = new TextField();
        txt1.defaultTextFormat = fmt;
        txt1.text = "Mouse CLICK";
        txt1.x = this.images[0].x - this.images[0].width /2 - 18;
        txt1.y = this.images[0].y + this.images[0].height/2;
        this.addChild(txt1);

        let txt2:TextField = new TextField();
        txt2.defaultTextFormat = fmt;
        txt2.text = "Mouse UP/DOWN";
        txt2.x = this.images[1].x - this.images[1].width / 2 - 18;
        txt2.y = this.images[1].y + this.images[1].height / 2;
        this.addChild(txt2);

        let txt3:TextField = new TextField();
        txt3.defaultTextFormat = fmt;
        txt3.text = "Mouse OVER/OUT";
        txt3.x = this.images[2].x - this.images[2].width / 2 - 18;
        txt3.y = this.images[2].y + this.images[2].height / 2;
        this.addChild(txt3);

        let txt4:TextField = new TextField();
        txt4.defaultTextFormat = fmt;
        txt4.text = "Mouse MOVE";
        txt4.x = this.images[3].x - this.images[3].width / 2 - 18;
        txt4.y = this.images[3].y + this.images[3].height / 2;
        this.addChild(txt4);

        this.coordsTxt = new TextField();
        this.coordsTxt.defaultTextFormat = new TextFormat('Arial', 12, 0xFFFFFF);
        this.coordsTxt.x = 35;
        this.coordsTxt.y = this.images[3].y + this.images[3].height / 2 -20;
        this.coordsTxt.text = "x: 0, y: 0";
        this.addChild(this.coordsTxt);

        let txt5:TextField = new TextField();
        txt5.defaultTextFormat = fmt;
        txt5.text = "ENTERFRAME";
        txt5.x = this.images[4].x - this.images[4].width / 2 - 18;
        txt5.y = this.images[4].y + this.images[4].height / 2;
        this.addChild(txt5);

        let txt6:TextField = new TextField();
        txt6.defaultTextFormat = fmt;
        txt6.text = "Keyboard";
        txt6.x = this.images[5].x - this.images[5].width / 2 - 18;
        txt6.y = this.images[5].y + this.images[5].height / 2;
        this.addChild(txt6);

        this.images[0].addEventListener(MouseEvent.CLICK, this.handleClick);
        this.images[1].addEventListener(MouseEvent.MOUSE_DOWN, this.handleMouseDown);
        this.images[2].addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOver);
        this.images[3].addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOverMove);
        this.images[4].addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOverEnterframe);
        this.stage.addEventListener(KeyboardEvent.KEY_DOWN, this.handleKeyboardDown);
        

        let txt:TextField = new TextField();
        txt.defaultTextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        txt.text = "AEvent, MouseEvent, TouchEvent, and KeyboardEvent.";
        txt.y = this.height + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);
    }

    private handleClick = (e:MouseEvent):void =>
    {
        let flashMan:Sprite = e.currentTarget as Sprite;
        flashMan.scaleX = flashMan.scaleY = flashMan.scaleX == 1 ? .8 : 1;
    }

    private handleMouseDown = (e:MouseEvent):void =>
    {
        (e.currentTarget as Sprite).scaleX = (e.currentTarget as Sprite).scaleY = .8;
        this.stage.addEventListener(MouseEvent.MOUSE_UP, this.handleMouseUp);
    }

    private handleMouseUp = (e:MouseEvent):void =>
    {
        this.stage.addEventListener(MouseEvent.MOUSE_UP, this.handleMouseUp);
        this.images[1].scaleX = this.images[1].scaleY = 1;
    }

    private handleMouseOver = (e:MouseEvent):void =>
    {
        (e.currentTarget as Sprite).scaleX = (e.currentTarget as Sprite).scaleY = .8;
        e.currentTarget.addEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
    }

    private handleMouseOverMove = (e:MouseEvent):void =>
    {
        e.currentTarget.addEventListener(MouseEvent.MOUSE_MOVE, this.handleMouseMove);
    }

    private handleMouseOut = (e:MouseEvent):void =>
    {
        (e.currentTarget as Sprite).scaleX = (e.currentTarget as Sprite).scaleY = 1;
        e.currentTarget.removeEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
        this.images[4].removeEventListener(AEvent.ENTER_FRAME, this.handleEnterFrame);
        this.images[4].rotation = 0;
    }

    private handleMouseMove = (e:MouseEvent):void =>
    {
        let flashMan:Sprite = e.currentTarget as Sprite;
        this.coordsTxt.text = "x: " + Math.round(flashMan.mouseX) + ", y: " + Math.round   (flashMan.mouseY);
    }

    private handleMouseOverEnterframe =(e:MouseEvent):void =>
    {
        this.images[4].addEventListener(AEvent.ENTER_FRAME, this.handleEnterFrame);
        this.images[4].addEventListener(MouseEvent.MOUSE_OUT, this.handleMouseOut);
    }

    private handleEnterFrame = (e:AEvent):void =>
    {
        (e.currentTarget as Sprite).rotation++;
    }

    private handleKeyboardDown = (e:KeyboardEvent):void =>
    {
        this.stage.addEventListener(KeyboardEvent.KEY_UP, this.handleKeyboardUp);
        this.images[5].y -= 50;


    }

    private handleKeyboardUp = (e:KeyboardEvent):void =>
    {
        this.stage.removeEventListener(KeyboardEvent.KEY_UP, this.handleKeyboardUp);
        this.images[5].y += 50;
    }
}