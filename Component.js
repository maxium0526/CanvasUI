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
		this.isVisible = config.isVisible == null ? true : config.isVisible;

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

	onMouseEnter(e){
		this.executeAction('mouseenter');
	}

	onMouseLeave(e){
		this.executeAction('mouseleave');
	}

	onMousePoint(e){		
		this.executeAction('mousepoint');
	}

	onMousePress(e){
		this.executeAction('mousepress');
	}

	onMouseDrag(e){
		if(this.isDraggable){
			let dx = e.mousePosi.x - e.preMousePosi.x;
			let dy = e.mousePosi.y - e.preMousePosi.y;
			this.x += dx;
			this.y += dy;
			this.isDragging = true;

			e.ui.refreshDisplay();
		}



		this.executeAction('mousedrag');
	}

	onMouseRelease(e){
		if(this.isDraggable){
			this.isDragging = false;
		}
		this.executeAction('mouserelease');
	}

	onMouseClick(e){
		this.executeAction('mouseclick');
	}

	onFocus(e){
		this.executeAction('focus');
	}

	onOutFocus(e){
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

	toString(){
		return this.constructor.name;
	}
}