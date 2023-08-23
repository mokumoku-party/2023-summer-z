class AbstractParticle {
  position;
  velocity;
  acceleration;
  radius;
  color;
  graphicBuffer;

  constructor(pos, graphicBuffer) {
    this.position = pos;

    this.graphicBuffer = graphicBuffer;
  }

  update(delta) {
    this.velocity.add(this.acceleration);
    this.position.add(p5.Vector.mult(this.velocity, delta * 0.05));
  }

  draw() {
    this.graphicBuffer.strokeWeight(this.radius);
    this.graphicBuffer.stroke(this.color);
    this.graphicBuffer.point(this.position.x, this.position.y);
  }
}

class RasingParticle extends AbstractParticle {
  constructor(graphicBuffer, pos, color) {
    super(pos, graphicBuffer);
    this.velocity = createVector(0, random(-29, -20));
    this.acceleration = createVector(0, 0.7);
    this.color = color;
    this.radius = 6;
  }
}

class ExplodeParticle extends AbstractParticle {
  #lifespan;
  #velocityDist;
  #initLife;

  constructor(
    graphicBuffer,
    pos,
    color,
    r,
    v = 0.95,
    initLife = 350,
    v0 = p5.Vector.random3D().mult(15),
    acc = createVector(0, 0.1)
  ) {
    super(pos, graphicBuffer);
    this.velocity = v0;
    this.acceleration = acc;

    this.color = color;
    this.radius = r;
    this.#initLife = initLife;
    this.#lifespan = initLife;

    this.#velocityDist = v;
  }

  update(delta) {
    super.update(delta);

    this.velocity.mult(this.#velocityDist);
    this.#lifespan -= delta / 4.0;

    // 最後は光がだんだん消えていくように
    if (this.#lifespan < this.#initLife * 0.2) {
      this.radius *= 0.9;
    }
  }

  get done() {
    return this.#lifespan < 0;
  }
}
