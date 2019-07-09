class Textbox extends Component{
	constructor(config){
		super(config);
		this.width = config.width || 160;
		this.color = config.color || "#eeeeee";
		this.borderColor = config.borderColor || "#000000";
		this.fontColor = config.fontColor || "#000000";
		this.font = config.font || "12px Arial";
		this.isPasswordField = config.isPasswordField || false;

		this.showCursor = false;
		this.timer = null;

	}

	draw(ctx){
		let stars = "";
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.rect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.stroke();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = "left";
		ctx.textBaseline = "middle";
		if(this.isPasswordField){			
			for(let i=0; i<this.text.length; i++){
				stars += "*";
			}
			ctx.fillText(stars, this.getPosi().x, (this.getPosi().y+this.getPosi().y+this.height)/2, this.width);
		} else {
			ctx.fillText(this.text, this.getPosi().x, (this.getPosi().y+this.getPosi().y+this.height)/2, this.width);
		}
		if(this.showCursor){
			let width = Math.min(ctx.measureText(this.isPasswordField ? stars : this.text).width, this.width-2);
			ctx.strokeStyle = "#000000";
			ctx.beginPath();
			ctx.moveTo(this.getPosi().x+width+1, this.getPosi().y+2);
			ctx.lineTo(this.getPosi().x+width+1, this.getPosi().y+this.height-2);
			ctx.stroke();
		}
	}

	onMouseEnter(e){
		this.canvas.style.cursor = "text";
		super.onMouseEnter(e);
	}

	onMouseLeave(e){
		this.canvas.style.cursor = "default";
		super.onMouseLeave(e);
	}

	onFocus(e){
		let _this = this;
		clearInterval(this.timer);
		this.showCursor = true;
		this.isFocusing = true;

		this.timer = setInterval(function(){

			_this.showCursor = !_this.showCursor;
		},500);
		super.onFocus(e);
	}

	onOutFocus(e){
		clearInterval(this.timer);
		this.showCursor = false;
		this.isFocusing = false;
		super.onOutFocus(e);
	}

	onKeyDown(e, mousePosi, preMousePosi){
		if(this.isFocusing){
			if(e.keyCode==8){//backspace
				this.text = this.text.substring(0, this.text.length-1);
			}
		}
		super.onKeyDown(e);
	}

	onKeyPress(e, mousePosi, preMousePosi){
		if(this.isFocusing){
			this.text += String.fromCharCode(e.keyCode);
		}
		super.onKeyPress(e);
	}
}