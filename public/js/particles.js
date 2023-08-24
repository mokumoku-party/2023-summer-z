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
    this.velocity.add(p5.Vector.mult(this.acceleration, delta));
    this.position.add(p5.Vector.mult(this.velocity, delta));
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
    this.velocity = createVector(0, random(2, 3) * -3);
    this.acceleration = createVector(0, 0.1);
    this.color = color;
    this.radius = 6;
  }
}

class ExplodeParticle extends AbstractParticle {
  #lifespan;
  #velocityDist;
  #initLife;

  constructor(graphicBuffer, pos, color, r, v, initLife, v0, acc) {
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

    this.velocity.mult(this.#velocityDist * delta);
    this.#lifespan -= delta * 4.0;

    // 最後は光がだんだん消えていくように
    if (this.#lifespan < this.#initLife * 0.2) {
      this.radius *= 0.9;
    }
  }

  get done() {
    return this.#lifespan < 0;
  }
}
