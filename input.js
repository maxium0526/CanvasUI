var input = [];
var pre = []

class Input{
	constructor(){
		this.input = [];
		this.pre = [];
		for(let i=0; i<259; i++){
		input[i] = false;
		pre[i] = false;
	}
	}
	down(kc){
		input[kc] = true;
		//console.log(input);

	}
	up(kc){
		input[kc] = false;
		//console.log(input);

	}
	getState(kc){
		return input[kc];
	}
	isPressed(kc){
		return input[kc]===true && pre[kc]===false;		
	}

	isReleased(kc){
		return input[kc]===false && pre[kc]===true;
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
			pre[i] = input[i];
			// input[i] = false;
		}
	}
}


