import { GradientType, Shape, Sprite } from "@fp/flash/display";
import { BlurFilter } from "@fp/flash/filters";
import { Matrix } from "@fp/flash/geom";
import { Fire } from "./particles/Fire";


export class GatesOfHell extends Sprite
{
    constructor()
    {
        super();

        const mat:Matrix = new Matrix();
        mat.createGradientBox(600, 1, 0, -25, -125);

        const door:Sprite = new Sprite();
        door.graphics.beginGradientFill(GradientType.RADIAL, [0x464646, 0x000000], [1, 1], [1, 255], mat);
        door.graphics.lineTo(550, 0);
        door.graphics.lineTo(600, 100);
        door.graphics.lineTo(-50, 100);
        door.graphics.lineTo(0, 0);
        door.filters = [new BlurFilter(6,6)];
        this.addChild(door);

        let fire:Fire = new Fire();
        fire.x = 175;
        fire.y = 85;
        let msk:Sprite = new Sprite();
        msk.graphics.beginFill(0x000000, 0);
        msk.graphics.drawRect(-50, 0, 650, 650);
        msk.y = -560;
        this.addChild(msk);
        fire.mask = msk;
        this.addChild(fire);

    }
}