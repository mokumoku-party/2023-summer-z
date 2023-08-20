class AbstractParticle {
  position;
  velocity;
  acceleration;
  radius;
  color;
  trailLength;
  #trails;
  #trailItr = 0;

  constructor(pos) {
    this.position = pos;
  }

  update(delta) {
    if (this.#trails) {
      this.#trails[this.#trailItr] = this.position.copy();
      this.#trailItr = (this.#trailItr + 1) % this.trailLength;
    } else {
      this.#trails = Array(this.trailLength).fill(createVector(0, 0));
    }

    this.velocity.add(this.acceleration);
    this.position.add(p5.Vector.mult(this.velocity, delta * .05));
  }

  draw() {
    strokeWeight(this.radius);

    for (let i = 0; i < this.trailLength; i++) {
      const idx = (i + this.#trailItr) % this.trailLength;
      const trail = this.#trails[idx];
      const c = this.color;

      c.setAlpha(
        i * (1.0 / this.trailLength),
      );

      stroke(c);
      point(trail.x, trail.y);
    }
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
    this.#lifespan -= delta / 4.0;

    // 最後は光がだんだん消えていくように
    if (this.#lifespan < this.#initLife * .2) {
      this.radius *= .9;
    }
  }

  get done() {
    return this.#lifespan < 0;
  }
}
