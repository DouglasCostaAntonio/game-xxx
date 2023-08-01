export class FrameRate {
  constructor(fps) {
    this.now;
    this.elapsed;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();
  }

  nextFrame() {
    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
      return true;
    }

    return false;
  }
}
