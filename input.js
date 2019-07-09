class Input{
	constructor(){
		this.input = [];
		this.pre = [];
		for(let i=0; i<259; i++){
		this.input[i] = false;
		this.pre[i] = false;
	}
	}
	down(kc){
		this.input[kc] = true;
		//console.log(this.input);

	}
	up(kc){
		this.input[kc] = false;
		//console.log(this.input);

	}
	getState(kc){
		return this.input[kc];
	}
	isPressed(kc){
		return this.input[kc]===true && this.pre[kc]===false;		
	}

	isReleased(kc){
		return this.input[kc]===false && this.pre[kc]===true;
	}

	getMousePosi(canvas, evt) {
	    var rect = canvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
	}
	nxt(){
		for(let i=0; i<259;i++){
			this.pre[i] = this.input[i];
			// this.input[i] = false;
		}
	}
}


