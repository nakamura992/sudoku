'use strict'

let place;


const question1 = [
  [8, 7, 1, 0, 0, 0, 5, 6, 4],
  [0, 9, 5, 0, 1, 7, 2, 3, 8],
  [2, 0, 3, 4, 5, 8, 0, 7, 1],
  [0, 2, 0, 1, 0, 3, 7, 9, 5],
  [0, 1, 9, 2, 7, 0, 8, 4, 3],
  [7, 0, 4, 0, 8, 5, 0, 0, 2],
  [1, 5, 0, 0, 0, 4, 3, 8, 0],
  [0, 8, 7, 5, 0, 0, 0, 0, 6],
  [0, 0, 0, 0, 3, 2, 1, 0, 7],
];

const question2 = [
  [0, 6, 7, 2, 0, 4, 1, 0, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 2],
  [0, 5, 0, 0, 7, 0, 3, 4, 0],
  [0, 0, 1, 0, 3, 2, 0, 0, 0],
  [4, 7, 2, 0, 0, 1, 5, 0, 0],
  [5, 0, 6, 7, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [6, 4, 0, 0, 0, 0, 0, 0, 0],
];

const question3 = [
  [0, 1, 0, 0, 0, 0, 0, 7, 4],
  [0, 7, 0, 0, 0, 9, 2, 0, 0],
  [0, 5, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 7],
  [0, 0, 0, 8, 6, 1, 0, 2, 0],
  [0, 0, 3, 0, 9, 7, 8, 0, 0],
  [7, 0, 0, 0, 8, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 4, 0],
  [9, 0, 2, 0, 5, 0, 0, 0, 0],
];

let easy = document.getElementById('easy');
let normal = document.getElementById('normal');
let hard = document.getElementById('hard');
let title = document.getElementById('header-title')


easy.onclick = function () {
  title.textContent = '初 級';
  alldelete();
  drawnum1();
}


normal.onclick = function () {
  title.textContent = '中 級'
  alldelete();
  drawnum2();
};

hard.onclick = function () {
  title.textContent = '上 級'
  alldelete();
  dranum3();
}


function alldelete() {
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

function drawnum1() {
  const main = document.querySelector('.main');

  for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
      let td = document.createElement('td');
      td.onclick = mainClick;
      tr.appendChild(td)
      if (question1[i][j] !== 0) {
        td.textContent = question1[i][j];
        td.classList.add('clickimpossible')
      } else {
        td.textContent = null;
        td.classList.add('clickpossible');
      }
    }
    main.appendChild(tr);
  }
  selectNu();


}


function drawnum2() {
  const main = document.querySelector('.main');

  for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.onclick = mainClick;

      if (question2[i][j] !== 0) {
        td.textContent = question2[i][j];
        td.classList.add('clickimpossible');
      } else {
        td.textContent = null;
        td.classList.add('clickpossible');
      }
    }
    main.appendChild(tr);
  }
  selectNu();
}


function dranum3() {
  const main = document.querySelector('.main')

  for (let i = 0; i < 9; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
      let td = document.createElement('td');
      tr.appendChild(td);
      td.onclick = mainClick;
      if (question3[i][j] !== 0) {
        td.textContent = question3[i][j];
        td.classList.add('clickimpossible');
      } else {
        td.textContent = null;
        td.classList.add('clickpossible');
      }
    }
    main.appendChild(tr);
  }
  selectNu();
}


function selectNu() {
  const select = document.querySelector('.select');
  for (let i = 0; i < 9; i++) {
    let td = document.createElement('td');
    td.onclick = selectClick;
    td.value = i + 1;
    select.appendChild(td);
    td.textContent = i + 1;
  }

}



function mainClick(e) {
  if (place !== undefined) {
    place.classList.remove('mainClick');
  }
  place = e.target;
  place.classList.add('mainClick');

}


function selectClick(e) {
  place.textContent = e.target.value;
}

function remove() {
  place.textContent = null;
}


function check() {
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
