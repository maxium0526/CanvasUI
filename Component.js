class Component{
	constructor(config){
		this.x = config.x || 0;
		this.y = config.y || 0;
		this.width = config.width || 80;
		this.height = config.height || 20;
		this.text = config.text || "";
		this.parent = config.parent ? config.parent : null;
		this.color = config.color ? config.color : "#000000";
		this.font = config.font ? config.font : "12pt Arial";
		this.fontColor = config.fontColor ? config.fontColor : "#000000";

		this.onActions = {};
		this.canvas = config.canvas || null;

		this.isDraggable = config.isDraggable || false;
		this.isDragging = false;
		this.isFocusing = false;
		this.isPressing = false;
	}

	getPosi(){
		return {
			x: this.x + ( this.parent ? this.parent.getPosi().x : 0),
			y: this.y + ( this.parent ? this.parent.getPosi().y : 0)
		}
	}

	nxt(){

	}

	draw(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.width, this.height);
	}

	isPointed(mousePosi){
		if(mousePosi.x >= this.getPosi().x && mousePosi.x <= this.getPosi().x+this.width){
			if(mousePosi.y >= this.getPosi().y && mousePosi.y <= this.getPosi().y+this.height){
				return true;
			}
		}
		return false;
	}

	onMouseEnter(mousePosi){
		this.executeAction('mouseenter');
	}

	onMouseLeave(mousePosi){
		this.executeAction('mouseleave');
	}

	onMousePoint(mousePosi){		
		this.executeAction('mousepoint');
	}

	onMousePress(mousePosi){
		this.executeAction('mousepress');
	}

	onMouseDrag(mousePosi, preMousePosi){
		if(this.isDraggable){
			let dx = mousePosi.x - preMousePosi.x;
			let dy = mousePosi.y - preMousePosi.y;
			this.x += dx;
			this.y += dy;
			this.isDragging = true;
		}
		this.executeAction('mousedrag');

		
	}

	onMouseRelease(mousePosi, preMousePosi){
		if(this.isDraggable){
			this.isDragging = false;
		}
		this.executeAction('mouserelease');
	}

	onMouseClick(mousePosi, preMousePosi){
		this.executeAction('mouseclick');
	}

	onFocus(mousePosi, preMousePosi){
		this.executeAction('focus');
	}

	onOutFocus(mousePosi, preMousePosi){
		this.executeAction('outfocusF');
	}

	onKeyDown(e, mousePosi, preMousePosi){
		this.executeAction('keydown');
	}
	onKeyPress(e, mousePosi, preMousePosi){
		this.executeAction('press');
	}

	setText(t){
		this.text = t;
		return this;
	}

	setParent(obj){
		this.parent = obj;
		return this;
	}

	setCanvas(canvas){
		this.canvas = canvas;
		return this;
	}

	on(action, callback){
		this.onActions[action] = callback;
		return this;
	}

	executeAction(action){
		if(this.onActions[action]){
			this.onActions[action](this, canvas);
		}
	}
}