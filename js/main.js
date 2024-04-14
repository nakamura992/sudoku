let place;

class SudokuQuestion {
  constructor() {
    /**
     * 問題の定義
     */
    this.questions = {
      easy: [
        [8, 7, 1, 0, 0, 0, 5, 6, 4],
        [0, 9, 5, 0, 1, 7, 2, 3, 8],
        [2, 0, 3, 4, 5, 8, 0, 7, 1],
        [0, 2, 0, 1, 0, 3, 7, 9, 5],
        [0, 1, 9, 2, 7, 0, 8, 4, 3],
        [7, 0, 4, 0, 8, 5, 0, 0, 2],
        [1, 5, 0, 0, 0, 4, 3, 8, 0],
        [0, 8, 7, 5, 0, 0, 0, 0, 6],
        [0, 0, 0, 0, 3, 2, 1, 0, 7],
      ],
      normal: [
        [0, 6, 7, 2, 0, 4, 1, 0, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 2],
        [0, 5, 0, 0, 7, 0, 3, 4, 0],
        [0, 0, 1, 0, 3, 2, 0, 0, 0],
        [4, 7, 2, 0, 0, 1, 5, 0, 0],
        [5, 0, 6, 7, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [6, 4, 0, 0, 0, 0, 0, 0, 0],
      ],
      hard: [
        [0, 1, 0, 0, 0, 0, 0, 7, 4],
        [0, 7, 0, 0, 0, 9, 2, 0, 0],
        [0, 5, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 2, 0, 0, 0, 0, 7],
        [0, 0, 0, 8, 6, 1, 0, 2, 0],
        [0, 0, 3, 0, 9, 7, 8, 0, 0],
        [7, 0, 0, 0, 8, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 4, 0],
        [9, 0, 2, 0, 5, 0, 0, 0, 0],
      ]
    }
  }

  getQuestion(difficulty) {
    return this.questions[difficulty];
  }
}

class SudokuPuzzle {
  constructor() {
    this.alldelete();
    this.sudokuQuestion = new SudokuQuestion();
    this.setupDifficulty();
    this.place;
  }

  setupDifficulty() {
    let easy = document.getElementById('easy');
    let normal = document.getElementById('normal');
    let hard = document.getElementById('hard');
    let title = document.getElementById('header-title');

    easy.onclick = () => this.selectDifficulty('初 級', 'easy', title);
    normal.onclick = () => this.selectDifficulty('中 級', 'normal', title);
    hard.onclick = () => this.selectDifficulty('上 級', 'hard', title);
  }

  selectDifficulty(header, difficulty, title) {
    title.textContent = header;
    this.alldelete();
    this.drawnum(difficulty);
  }

  /**
   * テーブルに定義した数字を配置
   */
  drawnum(difficulty) {
    const question = this.sudokuQuestion.getQuestion(difficulty);
    const main = document.querySelector('.main');

    for (let i = 0; i < 9; i++) {
      let tr = document.createElement('tr');
      for (let j = 0; j < 9; j++) {
        let td = document.createElement('td');
        td.onclick = (e) => this.mainClick(e);
        tr.appendChild(td)
        if (question[i][j] !== 0) {
          td.textContent = question[i][j];
          td.classList.add('clickimpossible')
        } else {
          td.textContent = null;
          td.classList.add('clickpossible');
        }
      }
      main.appendChild(tr);
    }
    this.selectNum();
  }

  alldelete() {
    const element_main = document.querySelector('.main')
    while (element_main.firstChild) {
      element_main.removeChild(element_main.firstChild);
    };

    const element_select = document.querySelector('.select')
    while (element_select.firstChild) {
      element_select.removeChild(element_select.firstChild);
    }

    document.querySelector('h2').textContent = null;
  }

  selectNum() {
    const select = document.querySelector('.select');
    for (let i = 0; i < 9; i++) {
      let td = document.createElement('td');
      td.onclick = (e) => this.selectClick(e);
      td.value = i + 1;
      select.appendChild(td);
      td.textContent = i + 1;
    }
  }

  mainClick(e) {
    if (this.place !== undefined) {
      this.place.classList.remove('mainClick');
    }
    this.place = e.target;
    this.place.classList.add('mainClick');
  }


  selectClick(e) {
    this.place.textContent = e.target.value;
  }

  remove() {
    this.place.textContent = null;
  }


  check() {
    const h2 = document.querySelector('h2');
    const tr = document.querySelectorAll('.main tr');
    let checkA = true;
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      let td = tr[i].querySelectorAll('td');
      for (let j = 0; j < 9; j++) {
        sum += parseInt(td[j].textContent);
        console.log(sum)
      }
      if (sum !== 45) {
        checkA = false;
        break;

      }
    }

    for (let i = 0; i < 9; i++) {
      let sum = 0;
      for (let j = 0; j < 9; j++) {
        let td = tr[j].querySelectorAll('td');
        sum += parseInt(td[i].textContent);
      }
      if (sum !== 45) {
        checkA = false;
        break;
      }
    }

    if (checkA) {
      h2.textContent = '正解！すばらしい！！';
    } else {
      h2.textContent = '不正解...もう一度チャレンジしよう！';
    }
  }
}

new SudokuPuzzle();