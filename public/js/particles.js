class AbstractParticle {
  position;
  velocity;
  acceleration;
  radius;
  color;

  constructor(pos) {
    this.position = pos;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(p5.Vector.mult(this.velocity, deltaTime * .05));
  }

  draw() {
    strokeWeight(this.radius);

    stroke(this.color);
    point(this.position.x, this.position.y);
  }
}

class RasingParticle extends AbstractParticle {
  constructor(pos, color) {
    super(pos);
    this.velocity = createVector(0, random(-29, -20));
    this.acceleration = createVector(0, .7);
    this.color = color;
    this.radius = 6;
  }
}

class ExplodeParticle extends AbstractParticle {
  #lifespan;
  #velocityDist;

  constructor(
    pos,
    color,
    r,
    v = 0.95,
    initLife = 350,
    v0 = p5.Vector.random2D().mult(random(1, 15)),
  ) {
    super(pos);
    this.velocity = v0;
    this.acceleration = createVector(0, .1);

    this.color = color;
    this.radius = r;
    this.#lifespan = initLife;

    this.#velocityDist = v;
  }

  update() {
    super.update();

    this.velocity.mult(this.#velocityDist);
    this.#lifespan -= 6;

    this.color.setAlpha(this.#lifespan);
  }

  get done() {
    return this.#lifespan < 0;
  }
}
