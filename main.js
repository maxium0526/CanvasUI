function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

var input = new Input();
input.down(258);
input.up(258);

var items = [];
items.push(new Button({
	x:5,
	y:5,
}));

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

var preMousePosi = {x: -1, y: -1};
var mousePosi = {x: -1, y: -1};

var pressedObj = null;
var pointedObj = null;
var prePointedObj = null;

$('#canvas').attr('width',1800).attr('height',900);
$('#canvas').mousemove(function(e){
	mousePosi = getMousePos(canvas, e);
})
$('#canvas').on('mousedown',function(e){
	input.down(258);

})
$('#canvas').on('mouseup',function(e){
	input.up(258);
})

setInterval(function(){	

	pointedObj = null;
	for(let item of items){
		if(item.isPointed(mousePosi)){
			pointedObj = item;

			if(prePointedObj !== item){
				item.onMouseEnter(mousePosi);
			} else {
				item.onMousePoint(mousePosi);
			}
			
			
			if(input.isPressed(258)){
				item.onPress(mousePosi);
				pressedObj = item;
			}

			if(input.isReleased(258)){
				if(pressedObj === item){
					item.onClick(mousePosi, preMousePosi);
					item.onRelease(mousePosi, preMousePosi);
				} else {
					item.onRelease(mousePosi, preMousePosi);
				}
				pressedObj = null;
			}

		} else {
			if(prePointedObj ===item){
				item.onMouseLeave(mousePosi);
			}
		}
	}

	if(input.isReleased(258)){
		// if(pressedObj){
		// 	pressedObj.onRelease(mousePosi, preMousePosi);
		// }
		pressedObj = null;
	}

	if(pressedObj && !input.isPressed(258) && input.getState(258)){
		pressedObj.onDrag(mousePosi, preMousePosi);
	}

	for(let item of items){
		item.nxt();
	}
	// n.nxt();

	input.nxt();
	preMousePosi = mousePosi;
	prePointedObj = pointedObj;

	window.requestAnimationFrame(display);
}, 1);

function display(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for(let item of items){
		item.draw(ctx);
	}
	// n.draw(ctx);

	window.requestAnimationFrame(display);
}