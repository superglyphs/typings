import { Component } from '@angular/core';
import { DictionaryService } from './dictionary.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private DictionaryService: DictionaryService) {}

  title = 'type-test-ng';
  randomString: string;
  score = {
    yayLetters: 0,
    yayWords: 0,
    nayLetters: 0,
    nayWords: 0
  };
  isLetterCorrect: Boolean;
  letters: string[] = [];
  dict: string[];
  time: number = 10;
  opacity: number = 100;
  bars: string[] = [];
  typeTimeStart: any = 0;
  typeTimeEnd: any = 0;
  speeds: number[] = []
  averageSpeed: number = 0;

  // handle user input accordingly
  typeLetter() { 
      document.addEventListener('keydown', (e) => {
        
        if (e.key.length === 1) {
          this.letters.push(e.key);
          this.checkLetter();
        }

        if (e.key === "Backspace") {
          this.letters.pop();
        }

        if (e.key === "Enter") {
          this.manageSpeed();
          this.checkInput();
          this.refreshData();
          this.resetTimer();
        }

      })
  }

  // nuke old string and get a new one
  refreshData() {
    this.letters = [];
    this.generateData();
  }

  // generate a random string
  generateData() {

    this.typeTimeStart = Date.now()

    let dataLenght = this.dict.length;

    function getRandomInt(max: number) {
      return Math.floor(Math.random() * Math.floor(max));
    }

    this.randomString = this.dict[getRandomInt(dataLenght)]

  }

  // timer logic
  startTimer() {
    this.resetTimer();

    setInterval(() => {

      this.time--;
      this.opacity -= 0.1;
      this.bars.pop();

      if (this.time < 0) {
        this.checkInput();
        this.refreshData();
        this.resetTimer();
      }


    }, 1000)

  }
  // timer resets
  resetTimer() {
    this.time = 10;
    this.opacity = 1;
    this.bars.length = 10;
  }

  manageSpeed() {
    this.typeTimeEnd = Date.now()
    this.speeds.push(this.typeTimeEnd - this.typeTimeStart)
    this.averageSpeed = this.speeds.reduce((a,b) => a + b, 0) / this.speeds.length
    this.averageSpeed = this.averageSpeed / 1000;
    console.log(typeof this.averageSpeed)
  }

  checkLetter(l: string, index: number) {

    if (this.randomString[index] === l) {
      this.score.yayLetters++
    }
    
    else {
      this.score.nayLetters++
    }
    
  }

  stylekLetter(l: string, index: number) {
    return this.randomString[index] === l
  }

  checkInput() {

    // stringify letters array
    let inputString = this.letters.join("")

    // check if there is input, it matches random data adjust points accordingly
    if (inputString === this.randomString) {
      this.score.yayWords++;
    }

    if (inputString != this.randomString && inputString.length > 0) {
      this.score.nayWords++;
    }

  }

  ngOnInit() {
    this.DictionaryService.getDict().pipe(take(1)).subscribe((data)=> {
      this.dict = data;
      this.generateData();
    })
    this.typeLetter();
    this.startTimer();
  }

}