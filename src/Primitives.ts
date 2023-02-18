import { GradientType } from "@fp/flash/display/GradientType";
import { Sprite } from "@fp/flash/display/Sprite";
import { AEvent } from "@fp/flash/events/AEvent";
import { DropShadowFilter } from "@fp/flash/filters/DropShadowFilter";
import { GlowFilter } from "@fp/flash/filters/GlowFilter";
import { Matrix } from "@fp/flash/geom/Matrix";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";
import { Resizable } from "./utils/Resizable";


export class Primitives extends Sprite
{
    public shapes:Sprite[] = [];
    
    constructor()
    {
        super();

        let radians:number = Math.PI / 180 * 45;
        let btMat:Matrix = new Matrix();
        btMat.createGradientBox(500, 500, radians)
        
        this.graphics.lineStyle(3, 0x00A3D9);
        this.graphics.beginGradientFill("linear", [0x464646, 0xFFFFFF], [.3,.43], [0, 255], btMat);
        this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

        
        let sqrMat:Matrix = new Matrix();
        sqrMat.createGradientBox(100, 100, Math.PI / 180 * 45, -50, -50);

        let sqr:Sprite = new Sprite();
        sqr.graphics.beginGradientFill("linear", [0xFF0000, 0xFFFFFF], [1, 1], [0, 255], sqrMat);
        sqr.graphics.drawRect(-50, -50, 100, 100);
        sqr.x = sqr.width/2 + 40;
        sqr.y = sqr.height/2 + 40;
        //sqr.filters = [new DropShadowFilter()];
        this.addChild(sqr);

        let circle:Sprite = new Sprite();
        circle.graphics.lineStyle(3, 0xCCCCCC);
        circle.graphics.beginFill(0x38A4DB);
        circle.graphics.drawCircle(0, 0, 50);
        circle.graphics.drawCircle(-25, 25, 10);
        circle.x = 250;
        circle.y = circle.height / 2 + 40;
        this.addChild(circle);

        let roundRect:Sprite = new Sprite();
        roundRect.graphics.beginFill(0x00FF00);
        roundRect.graphics.drawRoundRect(-50, -50, 100, 100, 10, 10);
        roundRect.x = 500 - roundRect.width/2 - 40;
        roundRect.y = roundRect.height/2 + 40;
        this.addChild(roundRect);

        let elipse:Sprite = new Sprite();
        elipse.graphics.lineStyle(3, 0x00A3D9);
        elipse.graphics.beginFill(0x464646);
        elipse.graphics.drawEllipse(-40, -50, 80, 100);
        elipse.x = 90;
        elipse.y = 250;
        this.addChild(elipse);
        
        let star:Sprite = new Sprite();
        star.graphics.lineStyle(2, 0x000000);
        star.graphics.beginFill(0xFFFF4D);
        star.graphics.moveTo(-50, -50);
        star.graphics.lineTo(0, -20);
        star.graphics.lineTo(50, -50);
        star.graphics.lineTo(20, 0);
        star.graphics.lineTo(50, 50);
        star.graphics.lineTo(0, 20);
        star.graphics.lineTo(-50, 50);
        star.graphics.lineTo(-20, 0);
        star.graphics.lineTo(-50, -50);
        star.x = 250;
        star.y = 250;
        star.filters = [new GlowFilter()];
        this.addChild(star);

        let mat:Matrix = new Matrix();
        mat.createGradientBox(100, 125);
        let cylinder:Sprite = new Sprite();
        cylinder.graphics.lineStyle(2, 0x000000);
        cylinder.graphics.beginGradientFill(GradientType.LINEAR, [0xFF7F00, 0xFF0000], [1, 1], [0, 255], mat);
        cylinder.graphics.drawRoundRect(-50, -50, 100, 100, 45);
        cylinder.x = 500 - cylinder.width/2 - 40;
        cylinder.y = 250;
        this.addChild(cylinder);

        mat = new Matrix();
        mat.createGradientBox(100, 100, 0, -50, -33);
        let triangle:Sprite = new Sprite();
        triangle.graphics.lineStyle(3, 0x00D9D9);
        triangle.graphics.beginFill(0xA300D9);
        triangle.graphics.beginGradientFill(GradientType.RADIAL, [0xA300D9, 0xFFBFFF], [1, 1], [0, 255], mat);
        triangle.graphics.moveTo(0, -50);
        triangle.graphics.lineTo(50, 50);
        triangle.graphics.lineTo(-50, 50);
        triangle.graphics.lineTo(0, -50);
        triangle.x = triangle.width/2 + 40;;
        triangle.y = 500 - triangle.height/2 - 40;
        this.addChild(triangle);

        let roundRectComplex:Sprite = new Sprite();
        roundRectComplex.graphics.beginFill(0x0000FF);
        roundRectComplex.graphics.drawRoundRectComplex(-50, -50, 100, 100, 25, 25, 0, 0);
        roundRectComplex.x = 250;
        roundRectComplex.y = 500 - roundRectComplex.height/2 - 40;
        this.addChild(roundRectComplex);

        let donut:Sprite = new Sprite();
        donut.graphics.lineStyle(0x000000);
        donut.graphics.beginFill(0xFFFFFF);
        donut.graphics.moveTo(-50, 0);
        donut.graphics.curveTo(0, -100, 50, 0);
        donut.graphics.curveTo(0, 100, -50, 0);
        donut.x = 500 - donut.width / 2 - 40;
        donut.y = 500 - 50 - 40;
        this.addChild(donut);

        this.shapes.push(sqr, circle, roundRect, elipse, star, cylinder, triangle, roundRectComplex, donut);

        let fmt:TextFormat = new TextFormat('Arial', 22, 0xFFFFFF);
        let txt:TextField = new TextField();
        txt.defaultTextFormat = fmt;
        txt.text = "Shapes, Fills, Strokes and Bezier Curves";
        txt.y = 500 + 20;
        txt.x = (this.width - txt.textWidth) / 2;
        this.addChild(txt);

        this.addEventListener(AEvent.ENTER_FRAME, this.update);

    }

    private update = (e:AEvent):void => {
        for (let i:number = 0; i < this.shapes.length; i++)
        {
            this.shapes[i].rotation++;
        }
    }
}