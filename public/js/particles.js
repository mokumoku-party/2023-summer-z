class AbstractParticle {
  position;
  velocity;
  acceleration;

  constructor(x, y) {
    this.position = createVector(x, y);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {}
}

class RasingParticle extends AbstractParticle {
  #hue;

  constructor(x, y, hue) {
    super(x, y);
    this.velocity = createVector(0, random(-29, -15));
    this.acceleration = createVector(0, 0);
    this.#hue = hue;
  }

  draw() {
    strokeWeight(6);

    stroke(this.#hue, 255, 255);
    point(this.position.x, this.position.y);
  }
}

class ExplodeParticle extends AbstractParticle {
  #hue;
  #lifespan = 255;

  constructor(x, y, hue) {
    super(x, y);
    this.velocity = p5.Vector.random2D(); // ランダムにベクトルを定義
    this.velocity.mult(random(5, 35));
    this.acceleration = createVector(0, 0);

    this.#hue = hue;
  }

  update() {
    super.update();

    this.velocity.mult(0.05);
    this.#lifespan -= 6;
  }

  done() {
    if (this.#lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    strokeWeight(3);
    stroke(this.#hue, 255, 255, this.#lifespan);
    point(this.position.x, this.position.y);
  }
}
