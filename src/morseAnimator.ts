export class MorseAnimator {
  textLine: Element;
  morseLine: Element;
  textContent: string = '';
  morseContent: string = '';
  morseProgress: number = 0;
  textProgress: number = 0;
  interval: number = -1;
  continuousSpaces: number = 0;

  constructor(textLine: Element, morseLine: Element) {
    this.textLine = textLine;
    this.morseLine = morseLine;

    this.textContent = textLine.innerHTML.trim();
    this.morseContent = morseLine.innerHTML.trim();

    textLine.innerHTML = ' ';
    morseLine.innerHTML = ' ';
  }
  beginAnimation(callback?: () => void) {
    this.interval = setInterval(() => {
      if (this.morseProgress >= this.morseContent.length) {
        clearInterval(this.interval);
        if (callback) callback();
        return;
      }

      const m = this.morseContent[this.morseProgress];
      this.morseProgress++;
      this.morseLine.innerHTML = this.morseContent.substring(0, this.morseProgress);
      if (m !== ' ' || this.textProgress === 0) {
        if (this.continuousSpaces === 1 || this.textProgress === 0) {
          this.textProgress += 1;
          this.textLine.innerHTML = this.textContent.substring(0, this.textProgress);
        } else if (this.continuousSpaces > 1) {
          this.textProgress += 2;
          this.textLine.innerHTML = this.textContent.substring(0, this.textProgress);
        }

        this.continuousSpaces = 0;
      } else this.continuousSpaces++;
    }, 50);
  }
}
