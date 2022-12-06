import { Equations } from "@fp/caurina/transitions/Equations";
import { Tweener } from "@fp/caurina/transitions/Tweener";
import { Sprite } from "@fp/flash/display/Sprite";
import { Matrix } from "@fp/flash/geom/Matrix";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";


export class TweenScreen extends Sprite
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

        let ball1:Sprite = new Sprite();
        ball1.graphics.beginFill(0x000000);
        ball1.graphics.drawCircle(0, 0, 50);
        ball1.x = 85;
        ball1.y = 85;
        this.addChild(ball1);

        let box:Sprite = new Sprite();
        box.graphics.beginFill(0xFFFFFF);
        box.graphics.drawRoundRect(-50, -50, 100, 100, 10, 10);
        box.x = 250;
        box.y = 85;
        this.addChild(box);

        Tweener.addTween(ball1, {time:2, y: 498 - (ball1.height / 2), transition:Equations.easeOutBounce});
        Tweener.addTween(box, {time:5, rotation:180, y: 498 - (ball1.height / 2), transition:Equations.easeOutElastic});


        let txt:TextField = new TextField();
        txt.defaultTextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        txt.text = "Tween Animations with Easing equations.";
        txt.y = this.height + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);
    }
}