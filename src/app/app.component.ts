import { Component } from '@angular/core';
import { DictionaryService } from './dictionary.service'
import { take } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private DictionaryService: DictionaryService) {
   }

  title = 'type-test-ng';
  randomString: string;
  score = {
    yay: 0,
    nay: 0
  };
  isLetterCorrect: Boolean;
  letters: string[] = [];
  dict: string[];
  time: number = 10;
  opacity: number = 100;
  bars: string[] = [''];

  typeLetter() {
        
    document.addEventListener('keydown', (e) => {
      
      if (e.key.length === 1) {
        this.letters.push(e.key);
      }

      if (e.key === "Backspace") {
        this.letters.pop();

      }

      if (e.key === "Enter") {
        this.checkInput();
        this.refreshData();
        this.resetTimer();

      }
      
    })

}

refreshData() {
  this.letters = [];
  this.generateData();
}

generateData() {

  let dataLenght = this.dict.length;

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  this.randomString = this.dict[getRandomInt(dataLenght)]


}

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

resetTimer() {
  this.time = 10;
  this.opacity = 1;
  this.bars.length = 10;
}

checkLetter(l: string, index: number) {
  return this.randomString[index] === l
}

checkInput() {

  // stringify letters array
  let inputString = this.letters.join("")

  // check if input matches random data
  if (inputString === this.randomString) {
    this.score.yay++;
  }
  else {
    this.score.nay++;
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