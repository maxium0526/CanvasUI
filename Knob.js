class Knob extends Component{
	constructor(config){
		super(config);
		this.r = config.r || 20;
		this.value = config.value || 0;
		this.valueChangePerDegree = config.valueChangePerDegree || 0.1;
		this.maxValue = config.maxValue || 100;
		this.minValue = config.minValue	|| 0;
		this.integerValue = config.integerValue || true;
		this.borderColor = config.borderColor || "#000000";
		this.color = config.color || "#eeeeee";
		this.markColor = config.markColor || "#000000";
		this.markR = config.markR || 3;
		this.degree = config.degree || 270;
	}

	draw(ctx){
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.arc(this.getPosi().x, this.getPosi().y, this.r, 0, 2 * Math.PI);
		ctx.stroke();

		ctx.fillStyle = this.color;
		ctx.arc(this.getPosi().x, this.getPosi().y, this.r, 0, 2 * Math.PI);
		ctx.fill();

		ctx.font = this.font;
		ctx.fillStyle = this.fontColor;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(Math.floor(this.value), this.getPosi().x, this.getPosi().y + this.r * 0.05, this.r * 2 / 1.1);

		ctx.fillStyle = this.markColor;
		ctx.beginPath();
		ctx.arc(this.getPosi().x + Math.cos(this.degree * Math.PI / 180) * this.r,this.getPosi().y + Math.sin(this.degree * Math.PI / 180) * this.r, this.markR, 0, 2 * Math.PI);
		ctx.fill();
	}

	isPointed(mousePosi){
		let dx = this.getPosi().x-mousePosi.x;
		let dy = this.getPosi().y-mousePosi.y;
		if(Math.sqrt( dx*dx + dy*dy) <= this.r){
			return true;
		}
		return false;
	}

	onMouseDrag(e){
		//中心點
		let x1 = this.getPosi().x;
		let y1 = this.getPosi().y;

		//初始點
		let x2 = e.mousePosi.x;
		let y2 = e.mousePosi.y;

		//位移點
		let x3 = e.preMousePosi.x;
		let y3 = e.preMousePosi.y;

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

		e.ui.refreshDisplay();
		super.onMouseDrag(e);
	}

	getValue(){
		return this.integerValue ? Math.floor(this.value) : this.value;
	}
}
