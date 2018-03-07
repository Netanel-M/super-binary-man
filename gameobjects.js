class Rect {
  constructor(x,y,w,h, color="darkgreen") {
    this.color = color;
    this.pos = new Vector(x,y);
    this.previousPos = new Vector(x,y);
    this.w = w;
    this.h = h;
    this.top = y;
    this.bottom = y+h;
    this.left = x;
    this.right = x+w;
  }

  draw() {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.w, this.h);
    ctx.restore();
  }

  containsPoint(x,y) {
    if(x >= this.pos.x &&
       x <= this.pos.x + this.w &&
       y >= this.pos.y &&
       y <= this.pos.y + this.h) {
      return true;
    } else {
      return false;
    }
  }

  intersectsWith(rect) {
    if(rect.pos.x < this.pos.x + this.w &&
       this.pos.x < rect.pos.x + rect.w &&
       rect.pos.y < this.pos.y + this.h) {
      return this.pos.y < rect.pos.y + rect.h;
    } else {
      return false;
    }
  }

}

class Sprite extends Rect {
  constructor(x,y,w,h,color="red") {
    super(x,y,w,h);
    this.color = color;
  }

  draw() {
    ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.fillStyle = this.color;
      ctx.fillRect(0,0,this.w,this.h);
    ctx.restore();
  }

  update(dt) {
    this.top = this.pos.y;
    this.bottom = this.pos.y+this.h;
    this.left = this.pos.x;
    this.right = this.pos.x+this.w;
  }

}

class Player extends Sprite {
  constructor(x,y,w,h, color="blue") {
    super(x,y,w,h);
    this.color = color;
    this.velocity = new Vector(0,0);
    this.acceleration = new Vector(0,0);
    this.goRight = false;
    this.goLeft = false;
    this.jump = false;
    this.onTheGround = true;
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  update(dt) {
    super.update(dt);

    if (this.onTheGround === false) {
      this.velocity.add(new Vector(0,canvas.height * 0.03 *dt));
    }

    if (this.jump === true && this.onTheGround === true) {
      this.velocity.sub(new Vector(0,canvas.height*5 * dt))
      this.onTheGround = false;
      soundSystem.jumpSound.play();
    }

    if(this.goRight === true) {
      this.pos.add(new Vector(canvas.width / 3 * dt,0));
    }

    else if (this.goLeft === true) {
      this.pos.sub(new Vector(canvas.width / 3 * dt,0));
    }

    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(1000 * dt);
  }

}

class BinaryBlock extends Sprite {
  constructor(x,y,w,h, number, color="orange") {
    super(x,y,w,h);
    this.originalY = this.pos.y;
    this.color = color;
    this.sinAccum = 0;
    this.number = number;
    this.toggled = false;
  }

  draw() {
    super.draw();
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.font = "25pt monospace";
    let width = ctx.measureText(this.number).width
    ctx.fillText(this.number, this.w/2-width/2, this.h/2+25/2);
    ctx.restore();

  }

  update(dt) {
    if (this.toggled === true) {
      this.sinAccum += 10 * dt; // had to move this up here to solve the annoying bug where the blocks only moved when bumped against 2x
      this.pos.y = this.pos.y + ( Math.sin(this.sinAccum) * 150 ) * -1 * dt;

      if(this.pos.y >= this.originalY) {
        this.toggled = false;
      }
    }

  }

  toggle() {
    if(this.color === "orange") { // a bit of a hack but this prevents bumping into a block multiple times
      this.toggled = true;
      for(let i = 0; i < blocks.length; i++) {

        if(blocks[i] === this) {
          if(sequence[i] === "1") {
            this.color = "lightgreen";
            soundSystem.rightBlockSound.play();
            accum += this.number;
          } else {
            this.color = "red";
            soundSystem.wrongBlockSound.play();
            score-= this.number;
          }
          // check if sequence is complete and if so reset the score blocks and accum
          if(parseInt(sequence, 2) === accum) {
            score += accum;
            accum = 0;
            soundSystem.successSound.play();
            resetBlocks();
          }
          break;
        }
      }
    }
  }

}

class SoundSystem {
  constructor() {
    this.jumpSound = new Howl({
      src: ['newJump.ogg']
    });
    this.rightBlockSound = new Howl({
      src: ['rightBlock.ogg']
    });
    this.wrongBlockSound = new Howl({
      src: ['wrongBlock.ogg']
    });
    this.successSound = new Howl({
      src: ['success.ogg']
    });
  }

}
