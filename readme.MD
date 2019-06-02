## Canvas ##

Showing UI(s) in a html canvas element. Just for fun.

### How to Use ###

This is the canvas that is about to show the UI.

	<html>
		<body>
			<canvas id="canvas"></canvas>
		</body>
	</html>

In JavaScript, get the canvas element using a variance.

	var canvas = document.getElementById('canvas');

Construct a new UI instance, put the canvas variance in the first argument. The object in the second argument is for configuration, will be discussed later.

	var ui = new UI(canvas, {});

Construct a scene instance.

	var scene = new Scene({
			x: 5,
			y: 5,
			width: 600,
			height: 400
		});

Construct a button and a textbox, and add them into the scene above.

	var button = new Button({
			x: 8,
			y: 8,
			text: "Im Button"
		});
	var textbox = new Textbox({
			x: 8,
			y: 36,
			text: ""
		});
	scene.addComponents([button, textbox]);

Finally, add the scene into the UI.

	ui.addScene(scene);

Now, there should be something shown in the canvas, if not, check the width and height of the canvas.