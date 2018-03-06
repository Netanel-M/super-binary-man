function generateRandomSequence() {
  let newSequence = "";
  for(let i = 0; i < sequence.length; i++) {
    randomNumber = Math.random();
    if(randomNumber < 0.5) {
      newSequence += "0";
    } else {
      newSequence += "1";
    }
  }
  
  if(parseInt(newSequence, 2) > 0) {
    sequence = newSequence;
  } else {
    generateRandomSequence();
  }

}

function resetBlocks() {
  generateRandomSequence();
  for(let i = 0; i < blocks.length; i++) {
    blocks[i].color = "orange";
  }
  solution = parseInt(sequence, 2);
}
