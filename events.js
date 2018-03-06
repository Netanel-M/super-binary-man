function initEvents() {
  canvas.addEventListener('mousemove', mouseMoved);
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);
}

function keyDown(event) {
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
  if(event.code === "KeyD" || event.code === "ArrowRight") {
    player.goRight = false;
  }
  else if (event.code === "KeyA" || event.code === "ArrowLeft") {
    player.goLeft = false;
  }
  else if (event.code === "Space") {
    player.jump = false;
  }
}

function mouseMoved(event) {
  mousePos = getMousePos(event);
}

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}
