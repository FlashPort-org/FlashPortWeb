import { Shape, Sprite } from "@fp/flash/display";
import { BlurFilter } from "@fp/flash/filters";


export class Particle extends Shape
{
    public endPos:number = 0;
    public speed:number = 1;
    public activeIndex:number = 0;
    public sineSpeed:number = 1;
    public sineAmplitude:number = 1;
    private _color:number = 0xFF7700;

    constructor()
    {
        super();

        this.graphics.beginFill(this._color);
        this.graphics.drawCircle(0, 0, 10);

        //this.filters = [new BlurFilter(7,7)];
        this.cacheAsBitmap = true;
    }

    public set color(value) {
        this.cacheAsBitmap = false;
        this._color = value;
        this.graphics.clear();
        this.graphics.beginFill(this._color);
        this.graphics.drawCircle(0, 0, 10);
        this.cacheAsBitmap = true;
    }

    public get color():number {
        return this._color;
    }
}