import { Equations, Sprite } from "@flashport/flashport";
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
import { MobileCheck } from "./utils/MobileCheck";
import { Scrollbar } from "./utils/Scrollbar";
import { MouseEvent } from "@flashport/flashport";

export class Main extends Sprite {
  private footer: Footer;
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
  private scrollbar:Scrollbar;
  private scrollContainer:Sprite;

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
      "assets/FlashPortMan-Med.png",
      "assets/tree.png"
		];

		let ld:AssetLoader = new AssetLoader(assets);
		ld.addEventListener(AEvent.COMPLETE, this.onAssetsLoaded);
		ld.load();
  }

  private onAssetsLoaded = (e:AEvent):void =>
	{

    this.footer = new Footer();
    this.footer.y = this.stage.stageHeight;
    this.addChild(this.footer);

    let header: Header = new Header();
    this.addChild(header);

    this.menu = new Menu();
    this.menu.x = (this.stage.stageWidth - this.menu.getBounds(this.menu).width) / 2;
    this.menu.y = 125;
    this.menu.addEventListener(MenuEvent.MENU_CLICKED, this.handleMenuClicked);
    this.addChild(this.menu);

    this.gatesOfHell = new GatesOfHell();
    this.gatesOfHell.x = (this.stage.stageWidth - 500) / 2 - 25;
    this.gatesOfHell.y = this.stage.stageHeight - 100;
    this.addChild(this.gatesOfHell);

    this.scrollContainer = new Sprite();
    this.scrollContainer.y = this.menu.y + (MobileCheck.isMobile() ? 40 : 80);
    this.addChild(this.scrollContainer);

    this.primitives = new Primitives();
    this.filtered = new Filtered();
    this.text = new Text();
    this.masks = new Masks();
    this.events = new EventsScreen();
    this.tweens = new TweenScreen();
    //this.threed = new ThreeD();
    this.components = new Components();
    
    this.menuItems.push(
      this.primitives, this.filtered, this.text, this.masks, 
      this.events, this.tweens, this.components
    );
		

    this.showMenuItem(0);

    this.scrollbar = new Scrollbar(this.stage.stageHeight - 100);
    this.scrollbar.addEventListener("change", this.OnScrollbarChange);
    this.scrollbar.y = 100;
    this.scrollbar.x = this.stage.stageWidth - this.scrollbar.width - 2;
		
		if (!MobileCheck.isMobile())
		{
			this.addChild(this.scrollbar);
		}

    this.onResize();
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
    if (this.currMenuItem) this.scrollContainer.removeChild(this.currMenuItem);
    this.currMenuItem = this.menuItems[itemIndex];
    
    this.currMenuItem.scaleX = this.currMenuItem.scaleY = 1;
    let scale:number = (this.stage.stageWidth / this.currMenuItem.width) - .1;
    this.currMenuItem.scaleX = this.currMenuItem.scaleY = scale < 1 ? scale : 1;
    this.currMenuItem.x = (this.stage.stageWidth - this.currMenuItem.width) / 2;

    this.currMenuItem.alpha = 0;
    this.scrollContainer.addChild(this.currMenuItem);
    Tweener.addTween(this.currMenuItem, {time:2, alpha:1});
  };

  private onResize = (e: AEvent = null): void => {
    this.footer.y = this.stage.stageHeight;
    this.gatesOfHell.x = (this.stage.stageWidth - 500) / 2 - 25;

    this.currMenuItem.scaleX = this.currMenuItem.scaleY = 1;
    let scale:number = (this.stage.stageWidth / this.currMenuItem.width) - .1;
    this.currMenuItem.scaleX = this.currMenuItem.scaleY = scale < 1 ? scale : 1;
    this.currMenuItem.x = (this.stage.stageWidth - this.currMenuItem.width) / 2;

    if (MobileCheck.isMobile())
    {
      this.menu.scaleX = this.menu.scaleY = 1;
      let menuScaleDiff:number = (this.stage.stageWidth / this.menu.width) - .05;
      this.menu.scaleX = this.menu.scaleY = menuScaleDiff;
    }

    if (MobileCheck.isMobile() || this.stage.stageHeight - 100 > this.scrollContainer.height)
		{
			this.scrollbar.visible = false;
			this.RemoveMouseWheel();
		}
		else
		{
			this.scrollbar.visible = true;
			this.AddMouseWheel();
		}

    this.menu.x = (this.stage.stageWidth - this.menu.width) / 2;
  };

  private AddMouseWheel = ():void =>
	{
		this.stage.addEventListener(MouseEvent.MOUSE_WHEEL, this.doScroll, false);
	};
	
	private RemoveMouseWheel = ():void =>
	{
		this.stage.removeEventListener(MouseEvent.MOUSE_WHEEL, this.doScroll);
	};
	
	private doScroll = (e:MouseEvent):void =>
	{
		var delta:number = e.delta;
		
		if (delta < 0)
		{
			if (this.scrollbar.value + Math.abs((delta / 3) * .2) < 1)
			{
				this.scrollbar.value += Math.abs((delta / 3) * .2);
			}
			else
			{
				this.scrollbar.value = 1;
			}
		}
		else if (delta > 0)
		{
			if (this.scrollbar.value - Math.abs((delta / 3) * .2) > 0)
			{
				this.scrollbar.value -= Math.abs((delta / 3) * .2);
			}
			else
			{
				this.scrollbar.value = 0;
			}
		}
	
		//e.preventDefault();
	};
	
	private OnScrollbarChange = (e:AEvent):void =>
	{
		//console.log("Scroll Value: " + _scrollbar.value);
		var topOffset:number = 20;
		var scrollArea:number = this.scrollContainer.height - this.stage.stageHeight;
		var scrollAmount:number = -((scrollArea + topOffset) * this.scrollbar.value) + topOffset;
		if (MobileCheck.isMobile())
		{
			this.scrollContainer.y = scrollAmount;
		}
		else
		{
			Tweener.removeTweens(this.scrollContainer, "y");
			Tweener.addTween(this.scrollContainer, {time: .35, y: scrollAmount, transition: Equations.easeOutQuad});
		}
	};
}


CanvasKitInit({
    locateFile: (file) => '/node_modules/canvaskit-wasm/bin/'+file,
}).then((canvasKit:CanvasKit) => {
    FPConfig.canvasKit = canvasKit;
    new Main();
});
