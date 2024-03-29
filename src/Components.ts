import { Sprite, Tweener } from "@flashport/flashport";
import { Matrix } from "@flashport/flashport";
import { MouseEvent } from "@flashport/flashport";
import { LineChart } from "@flashport/flashportui";
import { Plot } from "@flashport/flashportui";
import { KSlider } from "@flashport/flashportui";
import { KSpinner } from "@flashport/flashportui";
import { KStepper } from "@flashport/flashportui";
import { KCheck } from "@flashport/flashportui";
import { KButton } from "@flashport/flashportui";
import { KTextInput } from "@flashport/flashportui";
import { KCombo } from "@flashport/flashportui";
import { KAlert } from "@flashport/flashportui";

export class Components extends Sprite
{
    private alertBox:KAlert;
	
	constructor()
    {
        super();

        let radians:number = Math.PI / 180 * 45;
        let btMat:Matrix = new Matrix();
        btMat.createGradientBox(500, 500, radians)
        
        this.graphics.lineStyle(3, 0x00A3D9);
        this.graphics.beginGradientFill("linear", [0x464646, 0xFFFFFF], [.3,.43], [0, 255], btMat);
        this.graphics.drawRoundRect(0, 0, 500, 500, 15, 15);

        
        var chart:LineChart = new LineChart(450, 300, "Day", "Stock Quantity", this.xFormat);
		chart.name = "chart";
		var plots:Plot[] = [];
		
		for (var i:number = 0; i < 25; i++) 
		{
			var t:number = new Date().getTime() + (i * 43200000);
			var plot:Plot = new Plot(t, Math.floor((Math.random() * i) * 10) / 10);
			plots.push(plot);
		}
		chart.setData(plots);
		
		chart.x = 25;
		chart.y = 105;
		this.addChild(chart);
		
		var slider:KSlider = new KSlider(150);
		slider.x = 195;
		slider.y = 20;
		this.addChild(slider);
		
		var spinner:KSpinner = new KSpinner(24, 24);
		spinner.x = slider.x + slider.width + 20;
		spinner.y = 20;
		this.addChild(spinner);
		
		var stepper:KStepper = new KStepper();
		stepper.x = spinner.x + spinner.width + 20;
		stepper.y = 20;
		this.addChild(stepper);
		
		var check:KCheck = new KCheck();
		check.x = 25;
		check.y = 60;
		check.checked = true;
		this.addChild(check);
		
		var button:KButton = new KButton("BUTTON");
		button.x = check.x + check.width + 20;
		button.y = check.y;
		this.addChild(button);
		
		var btnAlert:KButton = new KButton("ALERT");
		btnAlert.x = button.x + button.width + 20;
		btnAlert.y = button.y;
		btnAlert.addEventListener(MouseEvent.CLICK, this.handleAlert);
		this.addChild(btnAlert);
		
		var txt:KTextInput = new KTextInput(120, 26);
		txt.text = "This is a TextInput";
		txt.y = btnAlert.y;
		txt.x = btnAlert.x + btnAlert.width + 20;
		this.addChild(txt); 
		
		var dropdown:KCombo = new KCombo();
		for (var j:number = 0; j < 50; j++) 
		{
			dropdown.addItem("item " + j);
		}
		dropdown.x = 25;
		dropdown.y = 20;
		this.addChild(dropdown);
    }

	private handleAlert = (e:MouseEvent):void =>
	{
		this.alertBox = new KAlert("Hello, this is an Alert!", 250);
		this.alertBox.okBTN.addEventListener(MouseEvent.CLICK, this.alertClicked);
		this.alertBox.cancelBTN.addEventListener(MouseEvent.CLICK, this.alertClicked);
		this.alertBox.alpha = 0;
		this.alertBox.y = ((this.stage.height - this.alertBox.height) / 2) - 40;
		(this.stage.root as Sprite).addChild(this.alertBox);
		Tweener.addTween(this.alertBox, {time:1, alpha:1, y: this.alertBox.y + 40});
	}
	
	private alertClicked = (e:MouseEvent):void =>
	{
		(this.stage.root as Sprite).removeChild(this.alertBox);
	}

	private xFormat = (chartX:number):string =>
	{
		var format:string = new Date(chartX).toDateString();
		return format;
	}
}