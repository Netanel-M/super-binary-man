function init() {

  this.canvas = document.querySelector("#clickerCanvas");
  this.ctx = canvas.getContext("2d");

  this.sequence = "00000";
  this.accum = 0;
  this.score = 0;

  generateRandomSequence();
  this.solution = parseInt(sequence, 2);

  this.oldTime = 0;
  this.mousePos = new Vector(0,0);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.w, this.h = canvas.width, canvas.height;

  this.platforms = [];
  this.blocks = [];
  this.walls = [];
  this.allKeys = [];

  this.soundSystem = new SoundSystem();

  let floor = new Rect(0,
    canvas.height-50,
    canvas.width,
    50);
  let floor2 = new Rect(0,
      canvas.height/2-100,
      canvas.width-canvas.width/2-100,
      50);
  let floor3 = new Rect(canvas.width/2+100,
          canvas.height/2-100,
          canvas.width-canvas.width/2,
          50);
  let leftWall = new Rect(0,0, 50, canvas.height - 200)
  let rightWall = new Rect(canvas.width-50,0, 50, canvas.height-200)

    for(let i = sequence.length-1; i>-1; i--) {
      let b = new BinaryBlock(
        //canvas.width - (i * (canvas.width/6) + (canvas.width/5)) + 25,
        canvas.width - (i * (canvas.width/8)) - sequence.length*(canvas.width/18.7),
        canvas.height - 400,
        70, 70,
        2**i)
      this.blocks.push(b);
    }

  this.platforms.push(floor);
  this.platforms.push(floor2);
  this.platforms.push(floor3);
  this.walls.push(leftWall);
  this.walls.push(rightWall);


  this.player = new Player(canvas.width/2-25,canvas.height-150, 50, 75);

  this.testEnemy = new Enemy(50, 0, 50, 75);

  this.enemies = [];
  this.enemies.push(testEnemy);

  initEvents();

  requestAnimationFrame(mainLoop);
}

function mainLoop(TIMESTAMP) {
  newTime = TIMESTAMP / 1000
  dt = newTime - oldTime;
  oldTime = newTime;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  // draw texts
  ctx.font = "32pt monospace";
  let fontWidth = ctx.measureText("Goal: "+solution).width
  ctx.fillText("Goal: "+ solution, canvas.width/2-fontWidth/2, 200);
  let fontWidthAccum = ctx.measureText("Sum: " + accum).width;
  ctx.fillText("Sum: " + accum, canvas.width/2 - fontWidthAccum/2, 100);
  ctx.fillText("Score: "  + score, canvas.width/16, 100);

  // draw platforms
  for (let i=0; i<this.platforms.length; i++) {
    this.platforms[i].draw();
  }
  // draw walls
  for (let i=0; i<this.walls.length; i++) {
    this.walls[i].draw();
  }
  // draw blocks
  for (let i=0; i<this.blocks.length; i++) {
    this.blocks[i].draw();
  }

  // draw and update player
  this.player.draw();

  this.player.update(dt);

  for(let i = 0; i < enemies.length; i++) {
    enemies[i].draw();
    enemies[i].update(dt);
  }

  // update blocks
  for (let i=0; i<this.blocks.length; i++) {
    this.blocks[i].update(dt);
  }

  //player.previousPos = new Vector(player.pos.x, player.pos.y); // no longer necessary for now
  requestAnimationFrame(mainLoop);
}
