class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  draw() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.x = mouseX - PADDLE_WIDTH / 2;
    this.x = constrain(this.x, 0, CANVAS_WIDTH - PADDLE_WIDTH);
  }

}
