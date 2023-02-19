import { Sprite } from "@flashport/flashport";
import { StageAlign } from "@flashport/flashport";
import { StageScaleMode } from "@flashport/flashport";
import { AssetLoader } from "@flashport/flashport";
import { AEvent } from "@flashport/flashport";
import { Filtered } from "./Filtered";
import { Header } from "./Header";
import { Primitives } from "./Primitives";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Text } from "./Text";
import { Masks } from "./Masks.js";
import { EventsScreen } from "./EventsScreen";
import { TweenScreen } from "./TweenScreen";
import { MenuEvent } from "./events/MenuEvent";
import { ThreeD } from "./ThreeD";
import { Bitmap, BitmapData } from "@flashport/flashport";
import { Matrix, Rectangle } from "@flashport/flashport";
import { GatesOfHell } from "./GatesOfHell";
import { Fire } from "./particles/Fire";
import CanvasKitInit from "canvaskit-wasm/bin/canvaskit.js";
import CanvasKitWasm from "canvaskit-wasm/bin/canvaskit.wasm?url";
import { CanvasKit } from "canvaskit-wasm";
import { Components } from "./Components";
import { Tweener } from "@flashport/flashport";
import { FPConfig } from "@flashport/flashport";

export class Main extends Sprite {
  private menu: Menu;
  private primitives: Primitives;
  private filtered: Filtered;
  private text: Text;
  private masks: Masks;
  private events: EventsScreen;
  private tweens: TweenScreen;
  private threed: ThreeD;
  private gatesOfHell:GatesOfHell;
  private components:Components;
  private menuItems: Sprite[] = [];
  private currMenuItem: Sprite;

  constructor() {
    FPConfig.autoSize = true;
    //FPConfig.highDPI = true;
    super();

    this.stage.align = StageAlign.TOP_LEFT;
    this.stage.scaleMode = StageScaleMode.NO_SCALE;
    this.stage.opaqueBackground = 0x333333;
    this.stage.canvas.style.background = "linear-gradient(90turn, #000000, #CCCCCC)";

    let assets:string[] = [
			"assets/fonts/Arial.ttf",
      "assets/ForkMeGithub.webp",
      "assets/FlashPortMan-Med.png"
		];

		let ld:AssetLoader = new AssetLoader(assets);
		ld.addEventListener(AEvent.COMPLETE, this.onAssetsLoaded);
		ld.load();
  }

  private onAssetsLoaded = (e:AEvent):void =>
	{
		let header: Header = new Header();
    this.addChild(header);

    let footer: Footer = new Footer();
    footer.y = this.stage.stageHeight;
    this.addChild(footer);

    this.gatesOfHell = new GatesOfHell();
    this.gatesOfHell.x = (this.stage.stageWidth - 500) / 2 - 25;
    this.gatesOfHell.y = 800;
    this.addChild(this.gatesOfHell);

    this.primitives = new Primitives();
    this.primitives.x = (this.stage.stageWidth - this.primitives.width) / 2;
    this.primitives.y = 250;
    this.menuItems.push(this.primitives);

    this.filtered = new Filtered();
    this.filtered.x = (this.stage.stageWidth - this.filtered.width) / 2;
    this.filtered.y = 250;
    this.menuItems.push(this.filtered);

    this.text = new Text();
    this.text.x = (this.stage.stageWidth - this.text.width) / 2;
    this.text.y = 250;
    this.menuItems.push(this.text);

    this.masks = new Masks();
    this.masks.x = (this.stage.stageWidth - this.masks.width) / 2;
    this.masks.y = 250;
    this.menuItems.push(this.masks);

    this.events = new EventsScreen();
    this.events.x = (this.stage.stageWidth - this.events.width) / 2;
    this.events.y = 250;
    this.menuItems.push(this.events);

    this.tweens = new TweenScreen();
    this.tweens.x = (this.stage.stageWidth - this.tweens.width) / 2;
    this.tweens.y = 250;
    this.menuItems.push(this.tweens);

    /* this.threed = new ThreeD();
    this.threed.x = (this.stage.stageWidth - this.tweens.width) / 2;
    this.threed.y = 250;
    this.menuItems.push(this.threed); */

    this.components = new Components();
    this.components.x = (this.stage.stageWidth - this.tweens.width) / 2;
    this.components.y = 250;
    this.menuItems.push(this.components);

    this.menu = new Menu();
    this.menu.x = (this.stage.stageWidth - this.menu.getBounds(this.menu).width) / 2;
    this.menu.y = 125;
    this.menu.addEventListener(MenuEvent.MENU_CLICKED, this.handleMenuClicked);
    this.addChild(this.menu);

    this.showMenuItem(0);

    this.stage.addEventListener(AEvent.RESIZE, this.onResize);
	}

  private handleMenuClicked = (e: MenuEvent) => {
    
    switch (e.title) {
      case "Primitives":
        this.showMenuItem(0);
        break;

      case "Filters":
        this.showMenuItem(1);
        break;

      case "Text":
        this.showMenuItem(2);
        break;

      case "Masks":
        this.showMenuItem(3);
        break;

      case "Events":
        this.showMenuItem(4);
        break;

      case "Animation":
        this.showMenuItem(5);
        break;

      case "Components":
        this.showMenuItem(6);
        break;

      case "3D":
        this.showMenuItem(7);
        break;

      default:
        this.showMenuItem(0);
        break;
    }
  };

  private showMenuItem = (itemIndex: number) => {
    if (this.currMenuItem) this.removeChild(this.currMenuItem);
    this.currMenuItem = this.menuItems[itemIndex];
    this.currMenuItem.alpha = 0;
    this.addChild(this.currMenuItem);
    Tweener.addTween(this.currMenuItem, {time:2, alpha:1});
  };

  private onResize = (e: AEvent): void => {
    this.menu.x = (this.stage.stageWidth - this.menu.getBounds(this.menu).width) / 2;
    this.primitives.x = (this.stage.stageWidth - this.primitives.width) / 2;
    this.filtered.x = (this.stage.stageWidth - this.filtered.width) / 2;
    this.text.x = (this.stage.stageWidth - this.text.width) / 2;
    this.masks.x = (this.stage.stageWidth - this.masks.width) / 2;
    this.events.x = (this.stage.stageWidth - this.events.width) / 2;
    this.tweens.x = (this.stage.stageWidth - this.tweens.width) / 2;
    this.components.x = (this.stage.stageWidth - this.tweens.width) / 2;
    this.gatesOfHell.x = (this.stage.stageWidth - 500) / 2 - 25;
  };
}


CanvasKitInit({
    locateFile: (file) => '/node_modules/canvaskit-wasm/bin/'+file,
}).then((canvasKit:CanvasKit) => {
    FPConfig.canvasKit = canvasKit;
    new Main();
});
