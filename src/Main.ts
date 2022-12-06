import { Sprite } from "@fp/flash/display/Sprite"
import { StageAlign } from "@fp/flash/display/StageAlign";
import { StageScaleMode } from "@fp/flash/display/StageScaleMode";
import { AEvent } from "@fp/flash/events";
import { FlashPort } from "@fp/FlashPort";
import { Filtered } from "./Filtered";
import { Header } from "./Header";
import { Primitives } from "./Primitives";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Text } from "./Text";
import { Masks } from "./Masks.js";
import { EventsScreen } from "./EventsScreen";
import { TweenScreen } from "./TweenScreen";

export class Main extends Sprite
{
    private menu:Menu;
    private primitives:Primitives;
    private filtered:Filtered;
    private text:Text;
    private masks:Masks;
    private events:EventsScreen;
    private tweens:TweenScreen;
    
    constructor()
    {
        super();

        FlashPort.autoSize = true;
        this.stage.align = StageAlign.TOP_LEFT;
        this.stage.scaleMode = StageScaleMode.NO_SCALE;
        this.stage.canvas.style.background = "linear-gradient(90turn, #000000, #CCCCCC)";

        
        let header:Header = new Header();
        this.addChild(header);

        let footer:Footer = new Footer();
        footer.y = this.stage.stageHeight;
        this.addChild(footer);

        this.menu = new Menu();
        this.menu.x = (this.stage.stageWidth - this.menu.getBounds(this.menu).width) / 2;
        this.menu.y = 125;
        this.addChild(this.menu);

        this.primitives = new Primitives();
        this.primitives.x = (this.stage.stageWidth - this.primitives.width) / 2;
        this.primitives.y = 250;
        //this.addChild(this.primitives);

        this.filtered = new Filtered();
        this.filtered.x = (this.stage.stageWidth - this.filtered.width) / 2;
        this.filtered.y = 250;
        //this.addChild(this.filtered);

        this.text = new Text();
        this.text.x = (this.stage.stageWidth - this.text.width) / 2;
        this.text.y = 250;
        //this.addChild(this.text);

        this.masks = new Masks();
        this.masks.x = (this.stage.stageWidth - this.masks.width) / 2;
        this.masks.y = 250;
        //this.addChild(this.masks);

        this.events = new EventsScreen();
        this.events.x = (this.stage.stageWidth - this.events.width) / 2;
        this.events.y = 250;
        //this.addChild(this.events);

        this.tweens = new TweenScreen();
        this.tweens.x = (this.stage.stageWidth - this.tweens.width) / 2;
        this.tweens.y = 250;
        this.addChild(this.tweens);

        this.stage.addEventListener(AEvent.RESIZE, this.onResize);
    }

    private onResize = (e:AEvent):void =>
    {
        this.menu.x = (this.stage.stageWidth - this.menu.getBounds(this.menu).width) / 2;
        this.primitives.x = (this.stage.stageWidth - this.primitives.width) / 2;
        this.filtered.x = (this.stage.stageWidth - this.filtered.width) / 2;
        this.text.x = (this.stage.stageWidth - this.text.width) / 2;
        this.masks.x = (this.stage.stageWidth - this.masks.width) / 2;
        this.events.x = (this.stage.stageWidth - this.events.width) / 2;
        this.tweens.x = (this.stage.stageWidth - this.tweens.width) / 2;
    }
}

new Main();