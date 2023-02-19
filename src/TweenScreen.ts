import { Equations } from "@flashport/flashport";
import { Tweener } from "@flashport/flashport";
import { Sprite } from "@flashport/flashport";
import { AEvent } from "@flashport/flashport";
import { Matrix } from "@flashport/flashport";
import { TextField } from "@flashport/flashport";
import { TextFormat } from "@flashport/flashport";

export class TweenScreen extends Sprite {
  private ball: Sprite;
  private box: Sprite;

  constructor() {
    super();

    let radians: number = (Math.PI / 180) * 45;
    let btMat: Matrix = new Matrix();
    btMat.createGradientBox(500, 500, radians);

    this.graphics.lineStyle(3, 0x00a3d9);
    this.graphics.beginGradientFill(
      "linear",
      [0x464646, 0xffffff],
      [0.3, 0.43],
      [0, 255],
      btMat
    );
    this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

    this.ball = new Sprite();
    this.ball.graphics.beginFill(0x000000);
    this.ball.graphics.drawCircle(0, 0, 50);
    this.ball.x = 85;
    this.ball.y = 85;
    this.addChild(this.ball);

    this.box = new Sprite();
    this.box.graphics.beginFill(0xffffff);
    this.box.graphics.drawRoundRect(-50, -50, 100, 100, 10, 10);
    this.box.x = 250;
    this.box.y = 85;
    this.addChild(this.box);

    let txt: TextField = new TextField();
    txt.defaultTextFormat = new TextFormat("Arial", 22, 0xffffff);
    txt.text = "Tween Animations with Easing equations.";
    txt.y = this.height + 20;
    txt.x = (this.width - txt.textWidth) / 2;
    this.addChild(txt);

    const msk:Sprite = new Sprite();
    msk.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);
    this.addChild(msk);
    this.mask = msk;

    this.addEventListener(AEvent.ADDED_TO_STAGE, this.handleAddedToStage);
    this.addEventListener(
      AEvent.REMOVED_FROM_STAGE,
      this.handleRemovedFromStage
    );
  }

  private handleRemovedFromStage = (e: AEvent): void => {
    Tweener.removeTweens(this.ball, "y");
    Tweener.removeTweens(this.box, "y");
    this.ball.y = 85;
    this.box.y = 85;
  };

  private handleAddedToStage = (e: AEvent): void => {
    Tweener.addTween(this.ball, {
      time: 2,
      y: 498 - this.ball.height / 2,
      transition: Equations.easeOutBounce,
    });
    Tweener.addTween(this.box, {
      time: 5,
      rotation: 180,
      y: 498 - this.box.height / 2,
      transition: Equations.easeOutElastic,
    });
  };
}
