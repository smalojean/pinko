export class Countdown {
  constructor() {
    this.values = ["3", "2", "1", "GO!"];
    this.index = 0;
    this.text = this.values[this.index];
    this.isFinished = false;

    this.interval = setInterval(() => {
      this.index++;

      if (this.index < this.values.length) {
        this.text = this.values[this.index];
      } else {
        this.text = "";
        this.isFinished = true;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
