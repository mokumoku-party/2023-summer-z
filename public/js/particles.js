class AbstractParticle {
  position;
  velocity;
  acceleration;
  radius;
  color;
  trailLength;
  #trails;

  constructor(pos) {
    this.position = pos;
    this.#trails = [];
  }

  update(delta) {
    this.#trails.push(this.position.copy());

    this.velocity.add(this.acceleration);
    this.position.add(p5.Vector.mult(this.velocity, delta * .05));

    this.#trails = this.#trails.slice(-this.trailLength);
  }

  draw() {
    strokeWeight(this.radius);

    this.#trails.forEach((trail, idx) => {
      const c = this.color;
      c.setAlpha(idx * (1.0 / this.trailLength));

      stroke(c);
      point(trail.x, trail.y);
    });
  }
}

class RasingParticle extends AbstractParticle {
  constructor(pos, color) {
    super(pos);
    this.velocity = createVector(0, random(-29, -20));
    this.acceleration = createVector(0, .7);
    this.color = color;
    this.radius = 6;
    this.trailLength = 15;
  }
}

class ExplodeParticle extends AbstractParticle {
  #lifespan;
  #velocityDist;
  #initLife;

  constructor(
    pos,
    color,
    r,
    v = 0.95,
    initLife = 350,
    v0 = p5.Vector.random3D().mult(15),
    trailLength = 15,
    acc = createVector(0, .1),
  ) {
    super(pos);
    this.velocity = v0;
    this.acceleration = acc;

    this.color = color;
    this.radius = r;
    this.trailLength = trailLength;
    this.#initLife = initLife;
    this.#lifespan = initLife;

    this.#velocityDist = v;
  }

  update(delta) {
    super.update(delta);

    this.velocity.mult(this.#velocityDist);
    this.#lifespan -= 6;

    // 最後は光がだんだん消えていくように
    if (this.#lifespan < this.#initLife * .2) {
      this.radius *= .9;
    }
  }

  get done() {
    return this.#lifespan < 0;
  }
}
