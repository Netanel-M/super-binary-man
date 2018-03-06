class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  sub(v) {
    this.x = this.x - v.x;
    this.y = this.y - v.y;
  }
  returnSub(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  mult(n) {
    this.x = this.x * n;
    this.y = this.y * n;
  }

  div(n) {
    this.x = this.x / n;
    this.y = this.y / n;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  normalize() {
    let m = this.mag();
    if(m != 0) {
      this.div(m);
    }
  }

  limit(max) {
    if( (this.mag()**2) > max**2 ) {
      this.normalize();
      this.mult(max);
    }
  }

}
