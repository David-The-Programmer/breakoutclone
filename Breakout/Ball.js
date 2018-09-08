class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
    this.xVel = 0;
    this.yVel = 0;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  move(xVel, yVel) {
    this.x += xVel;
    this.y += yVel;
  }


}
