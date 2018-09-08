class Block {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  draw() {
    if(this.y == Y_OF_BLOCK) {
      // red blocks
      fill(255, 0, 0);
    } else if(this.y == Y_OF_BLOCK + BLOCK_HEIGHT + BLOCK_SPACE) {
      // orange blocks
      fill(255, 165, 0);
    } else if(this.y == Y_OF_BLOCK + (2 *(BLOCK_HEIGHT + BLOCK_SPACE))) {
      // yellow blocks
      fill(255, 255, 0);
    } else if(this.y == Y_OF_BLOCK + (3 *(BLOCK_HEIGHT + BLOCK_SPACE))) {
      // green blocks
      fill(0, 255, 0);
    } else if(this.y == Y_OF_BLOCK + (4 *(BLOCK_HEIGHT + BLOCK_SPACE))) {
      fill(0, 0, 255);
    }
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }
}
