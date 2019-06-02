class Label extends Component{
	constructor(config){
		super(config);
	}

	draw(ctx){
		ctx.font = this.font;
		ctx.fillStyle = this.textColor;
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(this.text, this.getPosi().x, this.getPosi().y, this.width);
	}
}