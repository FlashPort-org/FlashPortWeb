import { Sprite } from "@fp/flash/display/Sprite";
import { TextField } from "@fp/flash/text/TextField";
import { TextFormat } from "@fp/flash/text/TextFormat";


export class Menu extends Sprite 
{
    private primitivesTxt:TextField;
    private filtersTxt:TextField;
    private textTxt:TextField;
    private masksTxt:TextField;
    private eventsTxt:TextField;
    private tweensTxt:TextField;
    private threeDTxt:TextField;
    private componentsTxt:TextField;

    private txtArr:TextField[];
    
    constructor()
    {
        super();

        this.txtArr = [this.primitivesTxt = new TextField(), this.filtersTxt = new TextField(), this.textTxt = new TextField(),
                        this.masksTxt = new TextField(), this.eventsTxt = new TextField(), this.tweensTxt = new TextField(),
                        this.threeDTxt = new TextField(), this.componentsTxt = new TextField()];
        let txtNames:string[] = ["Primitives", "Filters", "Text", "Masks", "Events", "Animation", "3D", "Components"];

        let format:TextFormat = new TextFormat('Arial', 16, 0x464646, true);
        let pos:number = 0;
        let spacing:number = 10;

        for (let i:number = 0; i < this.txtArr.length; i++)
        {
            let txt:TextField = this.txtArr[i];
            txt.defaultTextFormat = format;
            txt.text = txtNames[i];
            let hitArea:Sprite = new Sprite();
            hitArea.graphics.beginFill(0xFFFFFF, 0);
            hitArea.graphics.drawRect(0, 0, txt.textWidth + 2, txt.textHeight + 2);
            hitArea.addChild(txt);
            hitArea.x = pos;
            hitArea.buttonMode = true;
            pos += hitArea.width + spacing;
            this.addChild(hitArea);
        }
    }
}