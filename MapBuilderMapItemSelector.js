class MapBuilderMapItemSelector{
	constructor(config){
		this.config = config;
		this.parent = config.parent;
		this.mapBuilderCanvas = config.mapBuilderCanvas;

		this.scene = new Scene({
			x: config.x || 0,
			y: config.y || 0,
			width: 90,
			height: 245,
			isDraggable: true,
		});

		this.buttons = [];
		this.buttons.push(new Button({
			x: 5,
			y: 5,
			width: 80,
			height: 25,
			text: 'MapItem',
			color: '#000000',
			fontColor: '#ffffff',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 35,
			width: 80,
			height: 25,
			text: 'Bounce',
			color: '#ffff33',
			fontColor: '#000000',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 65,
			width: 80,
			height: 25,
			text: 'StickyWall',
			color: '#00ff00',
			fontColor: '#000000',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 95,
			width: 80,
			height: 25,
			text: 'SmoothWall',
			color: '#8EF9F6',
			fontColor: '#000000',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 125,
			width: 80,
			height: 25,
			text: 'SuckWall',
			color: '#1A005B',
			fontColor: '#ffffff',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 155,
			width: 80,
			height: 25,
			text: 'GravityWall',
			color: '#888888',
			fontColor: '#000000',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 185,
			width: 80,
			height: 25,
			text: 'MediumWall',
			color: '#1a005b',
			fontColor: '#ffffff',
		}));
		this.buttons.push(new Button({
			x: 5,
			y: 215,
			width: 80,
			height: 25,
			text: 'NonTouchWall',
			color: '#cecece',
			fontColor: '#000000',
		}));
		// this.buttons.push(new Button({
		// 	x: 5,
		// 	y: 245,
		// 	width: 80,
		// 	height: 25,
		// 	text: 'Field',
		// 	color: '#cecece',
		// 	fontColor: '#000000',
		// }));

		let _mapBuilderCanvas = this.mapBuilderCanvas;
		for(let button of this.buttons){
			button.on('mouseclick', function(b, canvas){
				_mapBuilderCanvas.setMapItemType(b.text);
			})
		}

		this.scene.addComponents(this.buttons);
		if(this.parent.constructor.name=='Scene'){
			this.parent.addComponents([this.scene]);
		} else {
			this.parent.addScene(this.scene);
		}
	}


}