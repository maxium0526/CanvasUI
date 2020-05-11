class MapBuilderCanvas extends Component{
	constructor(config){
		super(config);
		this.config = config;
		this.init();
	}

	init(){
		this.grid = this.config.grid ? this.config.grid : null;
		this.scale = this.config.scale ? this.config.scale : 1;
		this.gridColor = this.config.gridColor ? this.config.gridColor : '#cccccc';
		this.borderColor = this.config.borderColor ? this.config.borderColor : '#000000';
		this.mapItemType = 'MapItem';
		this.newMapItemColor = '#000000';

		this.clickedPosi = {};
		this.pressedPosi = {};
		this.releasedPosi = {};
		this.draggingPosi = {};

		this.newMapItem = {};
		this.selectedMapItem = null;

		this.mapItems = [];

	}

	draw(ctx){
		ctx.strokeStyle = this.borderColor;
		ctx.beginPath();
		ctx.rect(this.getPosi().x, this.getPosi().y, this.width, this.height);
		ctx.stroke();
		if(this.grid){
			for(let i = this.getPosi().x+this.grid; i<this.getPosi().x+this.width; i+=this.grid){
				ctx.strokeStyle = this.gridColor;
				ctx.beginPath();
				ctx.moveTo(i, this.getPosi().y);
				ctx.lineTo(i, this.getPosi().y+this.height);
				ctx.stroke();
			}
			for(let i = this.getPosi().y+this.grid; i<this.getPosi().y+this.height; i+=this.grid){
				ctx.strokeStyle = this.gridColor;
				ctx.beginPath();
				ctx.moveTo(this.getPosi().x, i);
				ctx.lineTo(this.getPosi().x + this.width, i);
				ctx.stroke();
			}
		}		

		for(let mapItem of this.mapItems){
			ctx.fillStyle = mapItem.color;
			ctx.beginPath();
			ctx.rect(mapItem.x / this.scale + this.getPosi().x, mapItem.y / this.scale + this.getPosi().y, mapItem.width / this.scale, mapItem.height / this.scale);
			ctx.fill();
		}

		if(this.selectedMapItem){
			ctx.strokeStyle = '#0000ff';
			ctx.beginPath();
			ctx.rect(this.selectedMapItem.x  / this.scale+ this.getPosi().x, this.selectedMapItem.y  / this.scale+ this.getPosi().y, this.selectedMapItem.width / this.scale, this.selectedMapItem.height / this.scale)
			ctx.stroke();
		}

		if(this.isDragging){
			ctx.strokeStyle = this.newMapItemColor;
			ctx.beginPath();
			ctx.rect(this.pressedPosi.x, this.pressedPosi.y, this.draggingPosi.x - this.pressedPosi.x, this.draggingPosi.y - this.pressedPosi.y);
			ctx.stroke();
		}
	}

	onMouseClick(e){
		this.clickedPosi.x = e.mousePosi.x;
		this.clickedPosi.y = e.mousePosi.y;
		let x = (this.clickedPosi.x-this.getPosi().x) * 2;
		let y = (this.clickedPosi.y-this.getPosi().y) * 2;
		let filteredMapItems = this.mapItems.filter((m)=>{
			return m.x<=x && x<=m.x+m.width && m.y<=y && y<=m.y+m.height;
		});
		this.selectedMapItem = filteredMapItems[filteredMapItems.length-1];
		e.ui.refreshDisplay()
		console.log(this.selectedMapItem)
	}

	onMousePress(e){
		this.pressedPosi.x = e.mousePosi.x;
		this.pressedPosi.y = e.mousePosi.y;
	}

	onKeyPress(e, mousePosi, preMousePosi){
		if(e.keyCode==114 && this.selectedMapItem){
			this.mapItems = this.mapItems.filter((m)=>{
				return m!=this.selectedMapItem;
			})
		}
		this.selectedMapItem = null;
		e.ui.refreshDisplay();
	}

	onMouseDrag(e){
		this.isDragging = true;
		this.draggingPosi = e.mousePosi;
		e.ui.refreshDisplay()
		// console.log(e.mousePosi, this.pressedPosi);
	}

	onMouseRelease(e){
		this.isDragging = false;

		this.releasedPosi.x = e.mousePosi.x;
		this.releasedPosi.y = e.mousePosi.y;

		let tlx = Math.min(this.pressedPosi.x, this.releasedPosi.x);
		let tly = Math.min(this.pressedPosi.y, this.releasedPosi.y);
		let drx = Math.max(this.pressedPosi.x, this.releasedPosi.x);
		let dry = Math.max(this.pressedPosi.y, this.releasedPosi.y);

		if(this.grid){
			let offsetX = (tlx - this.getPosi().x) % this.grid;
			if(offsetX< this.grid/2){
				this.newMapItem.x = tlx - offsetX - this.getPosi().x;
			} else {
				this.newMapItem.x = tlx - offsetX + this.grid - this.getPosi().x;
			}

			let offsetY = (tly - this.getPosi().y) % this.grid;
			if(offsetY< this.grid/2){
				this.newMapItem.y = tly - offsetY - this.getPosi().y;
			} else {
				this.newMapItem.y = tly - offsetY + this.grid - this.getPosi().y;
			}
		} else {
			this.newMapItem.x = tlx - this.getPosi().x;
			this.newMapItem.y = tly - this.getPosi().y;
		}

		if(this.grid){
			let offsetX = (drx - this.getPosi().x) % this.grid;
			if(offsetX< this.grid/2){
				this.newMapItem.width = drx - offsetX - this.newMapItem.x - this.getPosi().x;
			} else {
				this.newMapItem.width = drx - offsetX + this.grid - this.newMapItem.x - this.getPosi().x;
			}


			let offsetY = (dry - this.getPosi().y) % this.grid;
			if(offsetY< this.grid/2){
				this.newMapItem.height = dry - offsetY - this.newMapItem.y - this.getPosi().y;
			} else {
				this.newMapItem.height = dry - offsetY + this.grid - this.newMapItem.y - this.getPosi().y;
			}
		} else {
			this.newMapItem.width = drx - tlx;
			this.newMapItem.height = dry - tly;

		}

		this.newMapItem.x *= this.scale;
		this.newMapItem.y *= this.scale;
		this.newMapItem.width *= this.scale;
		this.newMapItem.height *= this.scale;
		this.newMapItem.type = this.mapItemType;
		this.newMapItem.color = this.newMapItemColor;
		if(this.newMapItem.width>0 && this.newMapItem.height>0){
			this.mapItems.push(this.newMapItem);
		}
		this.newMapItem = {};
		this.pressedPosi = {};
		this.releasedPosi = {};

		e.ui.refreshDisplay();
	}

	onMouseLeave(e){
		this.pressedPosi = {};
	}

	setMapItemType(type){
		switch(type){
			case "MapItem":
				this.newMapItemColor = "#000000";
				this.mapItemType = type;
				break;
			case "Bounce":
				this.newMapItemColor = "#FFFF33";
				this.mapItemType = type;
				break;
			case "StickyWall":
				this.newMapItemColor = "#00FF00";
				this.mapItemType = type;
				break;
			case "SmoothWall":
				this.newMapItemColor = "#8EF9F6";
				this.mapItemType = type;
				break;
			case "SuckWall":
				this.newMapItemColor = "#1A005B";
				this.mapItemType = type;
				break;
			case "GravityWall":
				this.newMapItemColor = "#888888";
				this.mapItemType = type;
				break;
			case "MediumWall":
				this.newMapItemColor = "#1A005B";
				this.mapItemType = type;
				break;
			case "NonTouchWall":
				this.newMapItemColor = "#CECECE";
				this.mapItemType = type;
				break;
			default: ;
		}
	}

	getMapItemJson(){
		return JSON.stringify(this.mapItems);
	}
}