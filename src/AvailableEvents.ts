import { DisplayObject } from "@fp/flash/display/DisplayObject";
import { GradientType } from "@fp/flash/display/GradientType";
import { Sprite } from "@fp/flash/display/Sprite";
import { MouseEvent } from "@fp/flash/events/MouseEvent";
import { Matrix } from "@fp/flash/geom/Matrix";
import { Resizable } from "./utils/Resizable";

export class AvailableEvents extends Resizable
{
    constructor()
    {
        super("Mouse Events");

        let sqr:Sprite = new Sprite();
        sqr.graphics.beginFill(0xFF0000);
        sqr.graphics.drawRect(-50, -50, 100, 100);
        sqr.x =90;
        sqr.y = 75;
        sqr.buttonMode = true;
        sqr.addEventListener(MouseEvent.MOUSE_OVER, this.handleMouseOver);
        this.addChild(sqr);

        let mat:Matrix = new Matrix();
        mat.createGradientBox(100, 125, 0, -50, -50);
        let triangle:Sprite = new Sprite();
        triangle.graphics.lineStyle(3, 0x00D9D9);
        triangle.graphics.beginFill(0xA300D9);
        triangle.graphics.beginGradientFill(GradientType.RADIAL, [0xA300D9, 0xFFBFFF], [1, 1], [0, 255], mat);
        triangle.graphics.moveTo(0, -50);
        triangle.graphics.lineTo(50, 50);
        triangle.graphics.lineTo(-50, 50);
        triangle.graphics.lineTo(0, -50);
        triangle.x = sqr.x + sqr.width + 40;
        triangle.y = 75;
        this.addChild(triangle);
    }

    private handleMouseOver = (e:MouseEvent):void =>
    {
        var item:DisplayObject = e.currentTarget as DisplayObject;
        item.rotation += 15;
    }

}