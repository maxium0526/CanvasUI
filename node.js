class Node extends Component{
	constructor(config){
		super(config)
		this.x = config.x;
		this.y = config.y;
		this.r = config.r;
		this.vx = 0;
		this.vy = 0;
		this.relx = 0;
		this.rely = 0;
		this.color = '#000000';
		this.pointed = false;
		this.pointedTime = 0;

		this.subNodes = [];		
	}

	nxt(){
		this.x += this.vx;
		this.y += this.vy;
		this.vx /=1.05;
		this.vy /=1.05;
		this.vx = Math.abs(this.vx)<0.01 ? 0 : this.vx;
		this.vy = Math.abs(this.vy)<0.01 ? 0 : this.vy;

		for(let node of this.subNodes){
			node.setRelativePosi(this.x, this.y);
		}

		if(!this.pointed){
			this.pointedTime = 0;
		}
		switch(this.pointedTime){
			case 0: this.color = '#000000'; break;
			case 10: this.color = '#000022'; break;
			case 20: this.color = '#000044'; break;
			case 30: this.color = '#000066'; break;
			case 40: this.color = '#000088'; break;
			case 50: this.color = '#0000aa'; break;
			case 60: this.color = '#0000cc'; break;
			case 70: this.color = '#0000ee'; break;

		}

		this.pointed = false;
	}

	draw(ctx){
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.getPosi().x, this.getPosi().y, this.r, 0, 2 * Math.PI);
		ctx.stroke();

		for(let subNode of this.subNodes){
			subNode.draw(ctx);
		}
	}

	isPointed(mousePosi){
		let dx = this.getPosi().x - mousePosi.x;
		let dy = this.getPosi().y - mousePosi.y;
		if(Math.sqrt(dx * dx + dy * dy) <= this.r){
			return true;
		} else {
			return false;
		}
	}

	onMousePoint(e){
		this.pointed = true;
		let dx = this.x - e.mousePosi.x;
		let dy = this.y - e.mousePosi.y;
		if(Math.sqrt(dx * dx + dy * dy) >= this.r - 5){
			this.pointedTime++;
		} else {
			
		}
	}

	onMousePress(e){
		this.vx = 0;
		this.vy = 0;
	}

	onMouseDrag(e){
		let dx = e.mousePosi.x - e.preMousePosi.x;
		let dy = e.mousePosi.y - e.preMousePosi.y;
		this.x += dx;
		this.y += dy;
		this.vx = 0;
		this.vy = 0;
		// for(let node of this.subNodes){
		// 	node.setRelativePosi(this.x, this.y);
		// }
	}

	onMouseRelease(e){
		let dx = e.mousePosi.x - e.preMousePosi.x;
		let dy = e.mousePosi.y - e.preMousePosi.y;
		this.vx = dx;
		this.vy = dy;
	}

	setRelativePosi(x, y){
		this.relx = x;
		this.rely = y;
		return this;
	}

	getPosi(){
		return {
			x: this.x+this.relx,
			y: this.y+this.rely
		}
	}

	addSubNodes(nodes){
		for(let node of nodes){
			this.subNodes.push(node.setRelativePosi(this.x, this.y));
		}
	}
}

