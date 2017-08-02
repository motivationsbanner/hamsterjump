require(['lib/pixi'], function (PIXI, demo) {
  var counter = 0,
    texture,
    hamster,
    jump = false,
    jumpcounter = 0;

  var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);
  app.stage.interactive = true;
  app.stage.on('pointerdown', onClick);

  PIXI.loader
    .add([
      "hamster.png"
    ])
    .on("progress", loadProgressHandler)
    .load(setup);

  function setup() {

    texture = PIXI.utils.TextureCache["hamster.png"];
    getRectangle(115, 384, 0, 6, texture)
    hamster = new PIXI.Sprite(texture);

    // center the sprite's anchor point
    hamster.anchor.set(0.5);
    hamster.x = 34;
    hamster.y = app.renderer.height / 1.5;

    app.stage.addChild(hamster);
    gameLoop();
  }

  function loadProgressHandler(loader, resource) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
  }

  function onClick() {
    jump = true;
    jumpcounter = 0;
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
    }
    //Render the stage
    app.renderer.render(app.stage);
  }
});
