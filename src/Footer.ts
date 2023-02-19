import { Sprite } from "@flashport/flashport";
import { AEvent } from "@flashport/flashport";
import { Matrix } from "@flashport/flashport";
import { Point } from "@flashport/flashport";


export class Footer extends Sprite
{
    private pin:Sprite;

    constructor()
    {
        super();

        /* this.pin = new Sprite();
        this.pin.graphics.beginFill(0xFFFFFF);
        this.pin.graphics.drawCircle(0, 0, 20);
        (this.stage.root as Sprite).addChild(this.pin); */

        this.handleResize();

        this.stage.addEventListener(AEvent.RESIZE, this.handleResize);
    }

    private handleResize = (e:AEvent = null):void =>
    {
        let pos:number = 0;
        let spacing:number = 40;
        let totalLines:number = this.stage.stageWidth / spacing;
        let centerPoint:Point = new Point(this.stage.stageWidth / 2, 200);

        //this.pin.x = centerPoint.x;
        //this.pin.y = centerPoint.y;

        let mat:Matrix = new Matrix();
        mat.createGradientBox(0, 300, Math.PI / 180 * -90, 0, -600);

        this.graphics.clear();
        this.graphics.lineStyle(2, 0xFFFFFF);
        this.graphics.lineGradientStyle('linear', [0x666666, 0x666666], [.5, 0], [0, 255], mat);

        for (let i:number = 0; i <= totalLines; i++)
        {
            this.graphics.moveTo(pos, 0);

            let angle:number = Math.atan2( centerPoint.y - -600, centerPoint.x - pos ) * ( 180 / Math.PI )
            let xPos:number = pos - (-810 * Math.cos(angle * Math.PI / 180));
            let yPos:number = 0 + (-810 * Math.sin(angle * Math.PI / 180));

            this.graphics.lineTo(xPos, yPos);
            pos += spacing;
        }
    }
}