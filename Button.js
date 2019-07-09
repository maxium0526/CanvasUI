class Button extends Component{
	constructor(config){
		super(config);
		// this.x = config.x || 0;
		// this.y = config.y || 0;
		// this.width = config.width || 80;
		// this.height = config.height || 20;
		this.text = config.text ? config.text : "Button";
		// this.parent = config.parent ? config.parent : null;
		this.color = config.color ? config.color : "#dddddd";
		this.pressingColor = config.pressingColor || "#cccccc";
		this.borderColor = config.borderColor || "#000000";
		// this.fontColor = config.fontColor ? config.fontColor : "#000000";
		// this.font = config.fontSize ? config.fontSize : "12pt Arial";

		this.onActions = {};
	}

	draw(ctx){
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.rect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.stroke();
		ctx.fillStyle = this.isPressing ? this.pressingColor : this.color;
		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.fillStyle = this.fontColor;
		ctx.font = this.font;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.text, (this.getPosi().x+this.getPosi().x+this.width)/2, (this.getPosi().y+this.getPosi().y+this.height)/2, this.width);
	}

	onMouseEnter(e){
		this.borderColor = "#0000FF";
		super.onMouseEnter(e);
	}

	onMouseLeave(e){
		this.borderColor = "#000000";
		this.isPressing = false;
		super.onMouseLeave(e);
	}

	onMousePress(e){
		this.isPressing = true;
		super.onMousePress(e);
	}

	onMouseRelease(e){
		this.isPressing = false;
		super.onMouseRelease(e);
	}

}

// class Button{
// 	constructor(config){
// 		this.x = config.x || 0;
// 		this.y = config.y || 0;
// 		this.width = config.width || 80;
// 		this.height = config.height || 20;
// 		this.text = config.text ? config.text : "Button";
// 		this.parent = config.parent ? config.parent : null;
// 		this.color = config.color ? config.color : "#dddddd";
// 		this.borderColor = config.borderColor || "#000000";
// 		this.fontColor = config.fontColor ? config.fontColor : "#000000";
// 		this.font = config.fontSize ? config.fontSize : "12pt Arial";

// 		this.vx = 0;
// 		this.vy = 0;
// 		this.dragging = false;
// 	}

// 	getPosi(){
// 		return {
// 			x: this.x + ( this.parent ? this.parent.getPosi().x : 0),
// 			y: this.y + ( this.parent ? this.parent.getPosi().y : 0)
// 		}
// 	}

// 	nxt(){
// 		this.x += this.vx;
// 		this.y += this.vy;
// 		this.vx /=1.05;
// 		this.vy /=1.05;
// 		this.vx = Math.abs(this.vx)<0.01 ? 0 : this.vx;
// 		this.vy = Math.abs(this.vy)<0.01 ? 0 : this.vy;
// 	}

// 	draw(ctx){
// 		ctx.strokeStyle = this.borderColor;
// 		ctx.beginPath();
// 		ctx.rect(this.getPosi().x, this.getPosi().y, this.width, this.height);
// 		ctx.stroke();
// 		ctx.fillStyle = this.color;
// 		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.width, this.height);
// 		ctx.fillStyle = this.fontColor;
// 		ctx.font = this.font;
// 		ctx.textAlign = "center";
// 		ctx.textBaseline = "middle";
// 		ctx.fillText(this.text, (this.getPosi().x+this.getPosi().x+this.width)/2, (this.getPosi().y+this.getPosi().y+this.height)/2, this.width);
// 	}

// 	isPointed(mousePosi){
// 		if(mousePosi.x >= this.getPosi().x && mousePosi.x <= this.getPosi().x+this.width){
// 			if(mousePosi.y >= this.getPosi().y && mousePosi.y <= this.getPosi().y+this.height){
// 				return true;
// 			}
// 		}
// 		return false;
// 	}

// 	onMouseEnter(mousePosi){
// 		this.borderColor = "#0000FF";
// 	}

// 	onMouseLeave(mousePosi){
// 		this.borderColor = "#000000";
// 		this.color = "#dddddd";
// 	}

// 	onMousePoint(mousePosi){
// 		// console.log("point");
// 	}

// 	onPress(mousePosi){
// 		this.color = "#bbbbbb";
// 		this.vx = 0;
// 		this.vy = 0;
// 	}

// 	onDrag(mousePosi, preMousePosi){
// 		// console.log("drag");
// 		let dx = mousePosi.x - preMousePosi.x;
// 		let dy = mousePosi.y - preMousePosi.y;
// 		this.x += dx;
// 		this.y += dy;
// 		this.vx = 0;
// 		this.vy = 0;

// 		this.dragging = true;
// 	}

// 	onRelease(mousePosi, preMousePosi){
// 		this.color = "#dddddd";
// 		let dx = mousePosi.x - preMousePosi.x;
// 		let dy = mousePosi.y - preMousePosi.y;
// 		this.vx = dx;
// 		this.vy = dy;

// 		this.dragging = false;
// 	}

// 	onClick(mousePosi, preMousePosi){

// 		if(this.dragging==false){
// 			let a = prompt("Hello, world!");
// 			alert(a);
// 		}
// 	}

// 	setParent(obj){
// 		this.parent = obj;
// 	}

// 	setText(t){
// 		this.text = t;
// 	}


// }