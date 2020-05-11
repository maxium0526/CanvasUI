class MapBuilder{
	constructor(config){
		this.config = config;
		this.parent = config.parent;
		this.scene = new Scene({
			x: config.x || 0,
			y: config.y || 0,
			width: config.width || 1000,
			height: config.height || 600,
			isDraggable: true,
		});
		this.mapBuilderCanvas = new MapBuilderCanvas({
			x: this.scene.x+5,
			y: this.scene.y+5,
			width: this.scene.width - 105,
			height: this.scene.height - 10,
			grid: config.grid ? config.grid : null,
			scale: config.scale ? config.scale : 2,
		});
		this.mapBuilderMapItemSelector = new MapBuilderMapItemSelector({
			x: this.scene.x + this.scene.width - 95,
			y: this.scene.y + 5,
			parent: this.scene,
			mapBuilderCanvas: this.mapBuilderCanvas,
		});
		this.scene.addComponents([this.mapBuilderCanvas]);

		if(this.parent.constructor.name=='Scene'){
			this.parent.addComponents([this.scene]);
		} else {
			this.parent.addScene(this.scene);
		}

	}
}