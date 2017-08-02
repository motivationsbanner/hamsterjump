require(['lib/pixi'], function (PIXI, demo) {
  var counter = 0,
    texture,
    hamster,
    jump = false,
    jumpcounter = 0,
	background,
	spawn=600,
	boxes=[];

  var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  //app.renderer.autoResize = true;
  //app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);
  app.stage.interactive = true;
  app.stage.on('pointerdown', onClick);

  PIXI.loader
    .add([
      "hamster.png",
	  "background.png",
	  "box.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

  function setup() {
	background = new PIXI.Sprite(PIXI.utils.TextureCache["background.png"]);
    texture = PIXI.utils.TextureCache["hamster.png"];
    getRectangle(115, 384, 0, 6, texture)
    hamster = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    hamster.anchor.set(0.5);
    hamster.x = 34;
    hamster.y = app.renderer.height / 1.5;
	app.stage.addChild(background);
    app.stage.addChild(hamster);
    gameLoop();
  }

  function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
  }

  function onClick() {
	if(hamster.y == app.renderer.height / 1.5 && !jump){
		jump = true;
	}
    
  }

  function getRectangle(height, length, frame, maxframes, texture) {
    var framelength = length / maxframes;
    var rectangle = new PIXI.Rectangle(framelength * frame, 0, framelength, height);
    texture.frame = rectangle;
  }

  function gameLoop() {

    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);

    counter = counter + 1;
    getRectangle(115, 384, counter % 6, 6, texture)
    if (hamster.y < app.renderer.height / 1.5 && !jump) {
      hamster.y = hamster.y + 1;
    }
    if (jump) {
      jumpcounter = jumpcounter + 1;
      hamster.y = hamster.y - 1;
    }
    if (jumpcounter > 60) {
      jump = false;
	  jumpcounter = 0;
    }
	
	if(counter%spawn==0){
		//spawn new box
		boxes[boxes.length] = new PIXI.Sprite(PIXI.utils.TextureCache["box.png"]); 
		app.stage.addChild(boxes[boxes.length-1]);
	}
	//move boxes
	
	//remove old boxes
	
	//background.width = window.innerWidth ;
	//background.height = window.innerHeight;
    //Render the stage
    app.renderer.render(app.stage);
  }
});
