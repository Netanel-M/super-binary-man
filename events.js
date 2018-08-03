function initEvents() {
  canvas.addEventListener('mousemove', mouseMoved);
  canvas.addEventListener('mousedown', mouseDown);
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
  window.addEventListener("gamepadconnected", gamepadConnected)
}


function gamepadConnected(event) {
  var gp = navigator.getGamepads()[event.gamepad.index];
  gamePad = gp;
};

function keyDown(event) {
  allKeys.push(event.code);

  if(event.code === "KeyD" || event.code === "ArrowRight") {
    player.goRight = true;
  }
  else if (event.code === "KeyA" || event.code === "ArrowLeft") {
    player.goLeft = true;
  }
  else if (event.code === "Space") {
    player.jump = true;
  }
}

function keyUp(event) {
  if(allKeys.includes(event.code)) {
    allKeys.splice(allKeys.indexOf(event.code));
  }
  if(event.code === "KeyD" || event.code === "ArrowRight") {
    player.goRight = false;
  }
  else if (event.code === "KeyA" || event.code === "ArrowLeft") {
    player.goLeft = false;
  }
  else if (event.code === "Space") {
    player.jump = false;
  }
  else if (event.code === "KeyS") {
    player.jump = false;
  }
}

function gamePadDown() {
  if (gamePad !== undefined || gamePad !== null) {

    if(gamePad.axes[0] >= 0.5) {
      player.goRight = true;
    } else if(gamePad.axes[0] <= -0.5) {
      player.goLeft = true;
    } else {
      player.goLeft = false;
      player.goRight = false;
    }

    if(gamePad.buttons[12].pressed === true) {
      player.goRight = true;
    } else if(gamePad.buttons[11].pressed === true) {
      player.goLeft = true;
    }
    if(gamePad.buttons[0].pressed === true ){
      player.jump = true;
    } else if(gamePad.buttons[0].pressed === false) {
      player.jump = false;
    }

  }
}

function mouseMoved(event) {
  mousePos = getMousePos(event);
}
function mouseDown(event) {
  mousePos = getMousePos(event);
  console.log('boom ' + mousePos.x, mousePos.y);
}
function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return new Vector(
      event.clientX - rect.left,
      event.clientY - rect.top
    );
}
