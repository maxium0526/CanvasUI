class Knob extends Component{
	constructor(config){
		super(config);
		this.r = config.r || 20;
		this.value = config.value || 0;
		this.valueChangePerDegree = config.valueChangePerDegree || 0.1;
		this.maxValue = config.maxValue || 100;
		this.minValue = config.minValue	|| 0;
		this.integerValue = config.integerValue || true;

		this.degree = config.degree || 270;
	}

	draw(ctx){
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.arc(this.getPosi().x, this.getPosi().y, this.r, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(Math.floor(this.value), this.getPosi().x, this.getPosi().y, this.r * 2 / 1.1);


	}

	isPointed(mousePosi){
		let dx = this.getPosi().x-mousePosi.x;
		let dy = this.getPosi().y-mousePosi.y;
		if(Math.sqrt( dx*dx + dy*dy) <= this.r){
			return true;
		}
		return false;
	}

	onMouseEnter(mousePosi){
		
	}

	onMouseLeave(mousePosi){
		
	}

	onMouseClick(mousePosi, preMousePosi){
	}

	onFocus(mousePosi, preMousePosi){
		
	}

	onOutFocus(mousePosi, preMousePosi){
		
	}

	onKeyDown(e, mousePosi, preMousePosi){
		
	}

	onKeyPress(e, mousePosi, preMousePosi){
		
	}

	onMouseDrag(mousePosi, preMousePosi){
		//中心點
		let x1 = this.getPosi().x;
		let y1 = this.getPosi().y;

		//初始點
		let x2 = mousePosi.x;
		let y2 = mousePosi.y;

		//位移點
		let x3 = preMousePosi.x;
		let y3 = preMousePosi.y;

		//http://www.csie.ntnu.edu.tw/~u91029/Point.html

		//計算方向
		//若cross product為正, 則逆時針; 為負, 則順時針
		let cross_product = (x2-x1) * (y3-y1) - (y2-y1) * (x3-x1);

		//計算角度
		let len1 = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
		let len2 = Math.sqrt((x1-x3)*(x1-x3)+(y1-y3)*(y1-y3));

		let cosd = (x2-x1) * (x3-x1) + (y2-y1) * (y3-y1);
		cosd = cosd / len1 / len2;

		let d = Math.acos(cosd) * 180 / Math.PI;

		let valueChange = d * this.valueChangePerDegree;

		if(cross_product>0){
			this.value -= valueChange;
			this.degree -= d;
		} else if(cross_product<0){
			this.value += valueChange;
			this.degree += d;
		}

		this.degree = (this.degree + 360) % 360;

		//Prevent value is over the range defined by maxValue and minValue
		if(this.value > this.maxValue){
			this.value = this.maxValue;
		} else if(this.value < this.minValue){
			this.value = this.minValue;
		}

	}

	getValue(){
		return this.integerValue ? Math.floor(this.value) : this.value;
	}
}
