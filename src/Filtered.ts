import { Shape } from "@fp/flash/display";
import { GradientType } from "@fp/flash/display/GradientType";
import { Sprite } from "@fp/flash/display/Sprite";
import { BlurFilter } from "@fp/flash/filters/BlurFilter";
import { DropShadowFilter } from "@fp/flash/filters/DropShadowFilter";
import { GlowFilter } from "@fp/flash/filters/GlowFilter";
import { Matrix } from "@fp/flash/geom/Matrix";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";


export class Filtered extends Sprite
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

        let circ:Sprite = new Sprite();
        circ.name = "circle";
        circ.graphics.lineStyle(5, 0xCCCCCC);
        circ.graphics.beginFill(0xFF7F00);
        circ.graphics.drawCircle(0, 0, 50);
        circ.x = circ.width / 2 + 80;
        circ.y = circ.height / 2 + 80;
        circ.filters = [new DropShadowFilter(10, 45, 0x000000, 1, 10, 10, 100, 100)];
        this.addChild(circ);

        let sqr:Sprite = new Sprite();
        sqr.graphics.lineStyle(5, 0x000000);
        sqr.graphics.beginFill(0xFFFF00);
        sqr.graphics.drawRect(-50, -50, 100, 100);
        sqr.filters = [new GlowFilter(0x0000FF, 1, 20, 20, 2, 100, false, false)];
        sqr.x = 500 - sqr.width / 2 - 80;
        sqr.y = sqr.height / 2 + 80;
        this.addChild(sqr);

        let sqr2:Sprite = new Sprite();
        sqr2.graphics.lineStyle(5, 0x000000, 1);
        sqr2.graphics.beginFill(0xFF0000, 1);
        sqr2.graphics.drawRect(-50, -50, 100, 100);
        sqr2.filters = [new GlowFilter(0xFFFFFF, 1, 20, 20, 2, 100, false, true)];
        sqr2.x = sqr2.width / 2 + 80;
        sqr2.y = 500 - sqr2.height / 2 - 80;
        this.addChild(sqr2);

        let mat:Matrix = new Matrix();
        mat.createGradientBox(100, 100, 0, -50, -33);
        
        let triangle:Sprite = new Sprite();
        triangle.graphics.lineStyle(3, 0x00D9D9);
        triangle.graphics.beginFill(0xA300D9);
        triangle.graphics.beginGradientFill(GradientType.RADIAL, [0xA300D9, 0xFFBFFF], [1, 1], [0, 255], mat);
        triangle.graphics.moveTo(0, -50);
        triangle.graphics.lineTo(50, 50);
        triangle.graphics.lineTo(-50, 50);
        triangle.graphics.lineTo(0, -50);
        triangle.filters = [new BlurFilter(5, 5)];
        triangle.x = 500 - triangle.width / 2 - 80;
        triangle.y = 500 - triangle.height / 2 - 80;
        this.addChild(triangle);

        let fmt:TextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        let txt:TextField = new TextField();
        txt.defaultTextFormat = fmt;
        txt.text = "Drop Shadow, Glow, Knockout Glow and Blur";
        txt.y = this.height + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);
    }
}