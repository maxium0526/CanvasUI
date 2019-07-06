class UI{
	constructor(canvas, config){
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.input = new Input();
		this.interval = config.interval || 5;

		this.preMousePosi = {x: -1, y: -1};
		this.mousePosi = {x: -1, y: -1};

		this.event = {
			mousePosi: this.mousePosi,
			preMousePosi: this.preMousePosi,

		};
		this.pressedObj = null;
		this.pointedObj = null;
		this.prePointedObj = null;
		this.focusedObj = null;
		this.preFocusedObj = null;
		this.draggingObj = null;

		this.items = [];
		this.scenes = [];

		this.debug = false;//debug mode

		this.init();
	}
	init(){
		this.canvas.tabindex = 1000;
		this.input.down(258);
		this.input.up(258);
		let _this = this;
		this.canvas.onmousedown = function(){
			_this.input.down(258);
		};
		this.canvas.onmouseup = function(){
			_this.input.up(258);

		}
		this.canvas.onmousemove = function(e){
			
			_this.mousePosi = _this.input.getMousePosi(_this.canvas, e);
		}

		window.onkeydown = function(e){
			for(let item of _this.items){
				item.onKeyDown(e, _this.mousePosi, _this.preMousePosi);
			}
		}

		window.onkeypress = function(e){
			for(let item of _this.items){
				item.onKeyPress(e, _this.mousePosi, _this.preMousePosi);
			}

			if(e.keyCode == 100){//'d'
				_this.debug = !_this.debug;
				console.log('%cDEBUG MODE '+ (_this.debug ? 'ON' : 'OFF'), 'color: #0000FF');
			}
		}

		setInterval(function(){	
			_this.pointedObj = null;
			// for(let item of _this.items){
			// 	if(item.isPointed(_this.mousePosi)){
			// 		_this.pointedObj = item;

			// 		if(_this.prePointedObj !== item){
			// 			item.onMouseEnter(_this.mousePosi);
			// 		} else {
			// 			item.onMousePoint(_this.mousePosi);
			// 		}
					
					
			// 		if(_this.input.isPressed(258)){
			// 			item.onMousePress(_this.mousePosi);
			// 			_this.pressedObj = item;
			// 		}

			// 		if(_this.input.isReleased(258)){
			// 			if(_this.pressedObj === item){
			// 				if(_this.draggingObj!==item){
			// 					item.onMouseClick(_this.mousePosi, _this.preMousePosi);//if the pressed component is not being dragged
			// 				}
			// 				item.onFocus(_this.mousePosi, _this.preMousePosi);
			// 				item.onMouseRelease(_this.mousePosi, _this.preMousePosi);
			// 				_this.focusedObj = item;
			// 				if(_this.preFocusedObj!==_this.focusedObj && _this.preFocusedObj){//當onFocuse發生時//判斷前一個focused物件是否onOutFocus
			// 					_this.preFocusedObj.onOutFocus(_this.mousePosi, _this.preFocusedObj);
			// 				}
			// 			} else {
			// 				item.onMouseRelease(_this.mousePosi, _this.preMousePosi);
			// 			}
			// 			_this.pressedObj = null;
			// 			_this.draggingObj = null;
			// 		}

			// 	} else {
			// 		if(_this.prePointedObj ===item){
			// 			item.onMouseLeave(_this.mousePosi);
			// 		}
			// 	}
			// }

			_this.event.mousePosi = _this.mousePosi;
			_this.event.preMousePosi = _this.preMousePosi;

			for(let item of _this.items){
				if(item.isPointed(_this.mousePosi)){
					_this.pointedObj = item;
					break;
				}					
			}

			if(_this.prePointedObj !== _this.pointedObj && _this.pointedObj){
				_this.pointedObj.onMouseEnter(_this.event);
			}

			if(_this.pointedObj !== _this.prePointedObj && _this.prePointedObj){
				_this.prePointedObj.onMouseLeave(_this.event);
			}

			if(_this.prePointedObj === _this.prePointedObj && _this.pointedObj){
				_this.pointedObj.onMousePoint(_this.event);
			}

			if(_this.pointedObj && _this.input.isPressed(258)){
				_this.pointedObj.onMousePress(_this.event);
				_this.pressedObj = _this.pointedObj;
			}

			if(_this.pointedObj && _this.input.isReleased(258)){
				if(_this.pointedObj === _this.pressedObj){
					if(_this.pointedObj !== _this.draggingObj){
						_this.pointedObj.onMouseClick(_this.event);
						// _this.pressedObj = null;
					}						
					_this.pointedObj.onFocus(_this.event);
					_this.focusedObj = _this.pointedObj;	
					// _this.draggingObj = null;				
				}
				_this.pointedObj.onMouseRelease(_this.event);
				
			}

			if(_this.input.isReleased(258)){
				_this.pressedObj = null;
				_this.draggingObj = null;
			}

			if(_this.preFocusedObj !== _this.focusedObj && _this.preFocusedObj){
				_this.preFocusedObj.onOutFocus(_this.event);
			}

			if(_this.pressedObj && !_this.input.isPressed(258) && _this.input.getState(258) && _this.isMouseMoved()){
				_this.pressedObj.onMouseDrag(_this.event);
				_this.draggingObj = _this.pressedObj;
			}

			for(let item of _this.items){
				item.nxt();
			}

			_this.input.nxt();
			_this.preMousePosi = _this.mousePosi;
			_this.prePointedObj = _this.pointedObj;
			_this.preFocusedObj = _this.focusedObj;
		}, this.interval);


		let display = function(){

			_this.ctx.clearRect(0, 0, _this.canvas.width, _this.canvas.height);

			for(let i=_this.items.length-1; i>=0; i--){
				_this.items[i].draw(_this.ctx);
			}

			// for(let scene of _this.scenes){
			// 	scene.draw(_this.ctx);
			// 	for(let comp of scene.comps){
			// 		comp.draw(_this.ctx);
			// 	}
			// }
			// n.draw(ctx);

			if(_this.debug){
				let strs = [];
				strs.push('Canvas Size:\t' + _this.canvas.width + ' x ' + _this.canvas.height);
				strs.push('Refresh Interval:\t'+_this.interval + ' ms');
				strs.push('');
				strs.push('Mouse Position:\t' + _this.mousePosi.x + ' x ' + _this.mousePosi.y);
				strs.push('');
				strs.push('Pointing Component:\t' + _this.pointedObj);
				strs.push('Pressing Component:\t' + _this.pressedObj);
				strs.push('Dragging Component:\t' + _this.draggingObj);
				strs.push('Focused Component:\t' + _this.focusedObj);
				let y = 10;
				_this.ctx.font = '12pt Arial';
				for(let str of strs){
					_this.ctx.fillText(str, 10, y);
					y+=20;
				}
			}

			window.requestAnimationFrame(display);
		}

		window.requestAnimationFrame(display);
	}

	isMouseMoved(offset = 0){
		if(Math.abs(this.mousePosi.x - this.preMousePosi.x)<=offset){
			if(Math.abs(this.mousePosi.y - this.preMousePosi.y)<=offset){
				return false;
			}
		}
		return true;
	}

	// addComponent(obj){
	// 	// this.items.push(obj.setCanvas(this.canvas));
	// 	this.scenes[0].addComponents([obj.setCanvas(this.canvas)]);
	// 	this.updateItems();
	// }

	addScene(scene){
		this.scenes.push(scene.setCanvas(this.canvas));
		this.updateItems();
	}

	updateItems(){
		this.items = [];
		for(let scene of this.scenes){
			this.items = this.items.concat(scene.comps);
			this.items.push(scene);
		}
	}
}