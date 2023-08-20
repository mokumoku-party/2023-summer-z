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
  #color;

  constructor(x, y, color) {
    super(x, y);
    this.velocity = createVector(0, random(-29, -15));
    this.acceleration = createVector(0, 0);
    this.#color = color;
  }

  draw() {
    strokeWeight(6);

    stroke(this.#color);
    point(this.position.x, this.position.y);
  }
}

class ExplodeParticle extends AbstractParticle {
  #color;
  #r;
  #initLife = 350;
  #lifespan = this.#initLife;

  constructor(x, y, color, r) {
    super(x, y);
    this.velocity = p5.Vector.random2D(); // ランダムにベクトルを定義
    this.velocity.mult(random(1, 15));
    this.acceleration = createVector(0, 0);

    this.#color = color;
    this.#r = r;
  }

  update() {
    super.update();

    this.velocity.mult(0.95);
    this.#lifespan -= 6;

    this.#color.setAlpha(this.#lifespan);
  }

  done() {
    if (this.#lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    strokeWeight(this.#r);

    stroke(this.#color);
    point(this.position.x, this.position.y);
  }
}
