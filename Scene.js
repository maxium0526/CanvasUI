class Scene extends Component{
	constructor(config){
		super(config);
		this.color = config.color || "#FFFFFF";
		this.comps = [];
	}

	// getPosi(){
	// 	return {
	// 		x: this.x,
	// 		y: this.y
	// 	}
	// }

	draw(ctx){
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.rect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.width, this.height);

		for(let comp of this.comps){
			comp.draw(ctx);
		}
	}

	addComponents(comps){
		for(let comp of comps){
			this.comps.push(comp.setParent(this).setCanvas(this.canvas));
		}
		return this;
	}

	setCanvas(canvas){
		this.canvas = canvas;
		for(let comp of this.comps){
			comp.canvas = this.canvas;
		}
		return this;
	}
}