class AbstractParticle {
  position;
  velocity;
  acceleration;

  constructor(pos) {
    this.position = pos;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(p5.Vector.mult(this.velocity, deltaTime * .05));
  }

  draw() {}
}

class RasingParticle extends AbstractParticle {
  #color;

  constructor(pos, color) {
    super(pos);
    this.velocity = createVector(0, random(-29, -20));
    this.acceleration = createVector(0, .7);
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

  constructor(pos, color, r) {
    super(pos);
    this.velocity = p5.Vector.random2D(); // ランダムにベクトルを定義
    this.velocity.mult(random(1, 15));
    this.acceleration = createVector(0, .1);

    this.#color = color;
    this.#r = r;
  }

  update() {
    super.update();

    this.velocity.mult(0.95);
    this.#lifespan -= 6;

    this.#color.setAlpha(this.#lifespan);
  }

  get done() {
    return this.#lifespan < 0;
  }

  draw() {
    strokeWeight(this.#r);

    stroke(this.#color);
    point(this.position.x, this.position.y);
  }
}
