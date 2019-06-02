class Checkbox extends Component{
	constructor(config){
		super(config);
		this.isChecked = config.isChecked || false;
		this.gap = config.gap || this.height/2;
		this.text = config.text || "Checkbox";
		this.color = config.color || "#eeeeee";
		this.tickColor = config.tickColor || "#000000";
	}

	draw(ctx){
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.rect(this.getPosi().x, this.getPosi().y, this.height, this.height);
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.height, this.height);
		ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'left';
		ctx.textBaseline = 'middle';
		ctx.fillText(this.text, this.getPosi().x + this.height + this.gap, (this.getPosi().y+this.getPosi().y+this.height)/2);
		if(this.isChecked){
			let tLineWidth = ctx.lineWidth;
			ctx.lineWidth = this.height / 10;
			ctx.strokeStyle = this.tickColor;
			ctx.beginPath();
			ctx.moveTo(this.getPosi().x + 1, (this.getPosi().y+this.getPosi().y+this.height)/2);
			ctx.lineTo(this.getPosi().x + this.height*1/5, this.getPosi().y+this.height-1);
			ctx.lineTo(this.getPosi().x + this.height - 1, this.getPosi().y-1);
			ctx.stroke();
			ctx.lineWidth = tLineWidth;
		}
	}

	onMouseEnter(mousePosi, preMousePosi){
		this.borderColor = "#0000FF";
	}

	onMouseLeave(mousePosi, preMousePosi){
		this.borderColor = "#000000";
	}

	onMouseClick(mousePosi, preMousePosi){
		this.isChecked = !this.isChecked;
	}
}