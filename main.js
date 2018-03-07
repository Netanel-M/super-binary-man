function init() {

  this.canvas = document.querySelector("#clickerCanvas");
  this.ctx = canvas.getContext("2d");

  this.sequence = "00000";
  this.accum = 0;
  this.score = 0;

  generateRandomSequence();
  this.solution = parseInt(sequence, 2);

  this.oldTime = 0;
  this.mousePos = {x:0, y:0};

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.w, this.h = canvas.width, canvas.height;

  this.platforms = [];
  this.blocks = [];
  this.walls = [];

  this.soundSystem = new SoundSystem();

  let floor = new Rect(50,
    canvas.height-50,
    canvas.width,
    50);
  let leftWall = new Rect(0,0, 50, canvas.height)
  let rightWall = new Rect(canvas.width-50,0, 50, canvas.height)

    for(let i = sequence.length-1; i>-1; i--) {
      let b = new BinaryBlock(
        canvas.width - (i * (canvas.width/6) + (canvas.width/5)),
        canvas.height - 400,
        70, 70,
        2**i)
      this.blocks.push(b);
    }

  this.platforms.push(floor);
  this.walls.push(leftWall);
  this.walls.push(rightWall);

  this.player = new Player(canvas.width/2-25,canvas.height-150, 50, 75);

  initEvents();

  requestAnimationFrame(mainLoop);
}

function mainLoop(TIMESTAMP) {
  newTime = TIMESTAMP / 1000
  dt = newTime - oldTime;
  oldTime = newTime;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.font = "32pt monospace";
  let fontWidth = ctx.measureText("Goal: "+solution).width
  ctx.fillText("Goal: "+ solution, canvas.width-fontWidth-100, 100);
  let fontWidthAccum = ctx.measureText("Accumulator: " + accum).width;
  ctx.fillText("Accumulator: " + accum, canvas.width/2 - fontWidthAccum/2, 100);
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

  this.player.draw();

  this.player.update(dt);
  // update blocks
  for (let i=0; i<this.blocks.length; i++) {
    this.blocks[i].update(dt);
  }

  let collisions = [];

  for(let i=0; i<this.platforms.length; i++) {
    collisions.push(collidePlayerWithPlatforms(this.player,this.platforms[i]))
  }

  for(let i=0; i<this.walls.length; i++) {
    collisions.push(collidePlayerWithWalls(this.player,this.walls[i]))
  }

  for(let i=0; i<this.blocks.length; i++) {
    collisions.push(collidePlayerWithBlocks(this.player,this.blocks[i]))
  }

  if(collisions.includes(true)) {} else {
    player.onTheGround = false;
  }

  //player.previousPos = new Vector(player.pos.x, player.pos.y); // no longer necessary for now
  requestAnimationFrame(mainLoop);
}
