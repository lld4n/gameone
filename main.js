let history = [];
let result = [];
let finishIter = false;

function generatePlus() {
  let example;
  while (true) {
    let a = Math.floor(Math.random() * 10 + 1);
    let b = Math.floor(Math.random() * 10 + 1);
    example = String(a) + "+" + String(b);
    if (a + b < 20 && a + b > 10) {
      let flag = true;
      for (let i = 0; i < history.length; i++) {
        if (history[i] === example) {
          flag = false;
          break;
        }
      }
      if (flag) {
        history.push(example);
        return example;
      }
    }
  }
}

function generateMinus() {
  let example;
  while (true) {
    let a = Math.floor(Math.random() * 20 + 11);
    let b = Math.floor(Math.random() * 10 + 1);
    example = String(a) + "-" + String(b);
    if (a - b < 10 && a - b > 0) {
      let flag = true;
      for (let i = 0; i < history.length; i++) {
        if (history[i] === example) {
          flag = false;
          break;
        }
      }
      if (flag) {
        history.push(example);
        return example;
      }
    }
  }
}

function generateOper() {
  return Math.floor(Math.random() * 2);
}

function generateAnswers(answer) {
  let choiceItems = document.querySelectorAll('.choice__item');
  let answers = [];
  let a = Math.floor(Math.random() * 6);
  choiceItems[a].querySelector('.choice__item-number').textContent = answer;
  choiceItems[a].querySelector('img').src = "./img/party.png";
  choiceItems[a].addEventListener('click', correctAnswer);
  answers.push(answer)
  for (let i = 0; i < 6; i++) {
    if (i !== a) {
      let buf = generateRandomAnswer(answers);
      choiceItems[i].querySelector('.choice__item-number').textContent = buf;
      choiceItems[i].querySelector('img').src = "./img/crying.png";
      choiceItems[i].addEventListener('click', wrongAnswer);
      answers.push(buf)
    }
  }

}


function correctAnswer(e) {
  console.log('correct')
  let item = e.target.closest('.choice__item');
  item.style.background = '#D1D1D1';
  item.style.border = "10px solid white";
  document.querySelectorAll('.example__number')[2].textContent = item.querySelector('.choice__item-number').textContent;
  let choiceItems = document.querySelectorAll('.choice__item');
  for (let i = 0; i < 6; i++) {
    choiceItems[i].removeEventListener('click', wrongAnswer);
    choiceItems[i].removeEventListener('click', correctAnswer);
  }
  setTimeout(() => {
    item.style.background = '#00D462';
    item.style.border = "";
    document.querySelectorAll('.example__number')[2].style.background = '#00D462';
    item.querySelector('.choice__item-number').style.display = 'none';
    item.querySelector('img').style.display = 'block';
    finishIter = true;
  }, 700);
  setTimeout(() => {
    item.style.background = '';
    item.style.border = "";
    item.querySelector('.choice__item-number').style.display = '';
    document.querySelectorAll('.example__number')[2].style.background = '';
    item.querySelector('img').style.display = '';
    result.push(true);
    document.querySelectorAll('.stats__circle')[result.length - 1].classList.add('stats__circle-correct')
    document.querySelector('.stats__info').textContent = result.length + "/10";
    start();
  }, 1500)
}

function wrongAnswer(e) {
  let item = e.target.closest('.choice__item');
  item.style.background = '#D1D1D1';
  item.style.border = "10px solid white";
  document.querySelectorAll('.example__number')[2].textContent = item.querySelector('.choice__item-number').textContent;
  let choiceItems = document.querySelectorAll('.choice__item');
  for (let i = 0; i < 6; i++) {
    choiceItems[i].removeEventListener('click', wrongAnswer);
    choiceItems[i].removeEventListener('click', correctAnswer);
  }
  setTimeout(() => {
    item.style.background = '#FF3232';
    item.style.border = "";
    document.querySelectorAll('.example__number')[2].style.background = '#FF3232';
    item.querySelector('.choice__item-number').style.display = 'none';
    item.querySelector('img').style.display = 'block';
    finishIter = true;
  }, 700);
  setTimeout(() => {
    item.style.background = '';
    item.style.border = "";
    item.querySelector('.choice__item-number').style.display = '';
    document.querySelectorAll('.example__number')[2].style.background = '';
    item.querySelector('img').style.display = '';
    result.push(false);
    document.querySelectorAll('.stats__circle')[result.length - 1].classList.add('stats__circle-wrong')
    document.querySelector('.stats__info').textContent = result.length + "/10";

    start();
  }, 1500)
}

function generateRandomAnswer(answers) {
  while (true) {
    let a = Math.floor(Math.random() * 20 + 1);
    if (!answers.includes(a)) {
      return a;
    }
  }

}


function start() {
  if (result.length === 10) {
    let date = new Date();
    let stringDate = String(date.getDay()) + '.' + String(date.getMonth() + 1) + "." + String(date.getFullYear()) + ' ' + String(date.getHours()) + ":" + String(date.getMinutes());
    if (localStorage.getItem('stats') === null) {
      let stats = {
        "stats": [{
          "result": result,
          "date": stringDate
        }]
      }
      localStorage.setItem('stats', JSON.stringify(stats));
    } else {
      let stats = JSON.parse(localStorage.getItem('stats'))
      stats.stats.push({
        "result": result,
        "date": stringDate
      })
      localStorage.setItem('stats', JSON.stringify(stats))
    }
    let href = window.location.href.split('/');
    href.pop();
    window.location.href = href.join('/');
  } else {
    let oper = generateOper();
    let example;
    if (oper === 0) {
      example = generatePlus().split('+');
      let number = document.querySelectorAll('.example__number');
      number[0].textContent = example[0];
      number[1].textContent = example[1];
      number[2].textContent = '?';
      document.querySelector('.example__operation').textContent = '+';
      generateAnswers(Number(example[0]) + Number(example[1]));
    } else {
      example = generateMinus().split('-');
      let number = document.querySelectorAll('.example__number');
      number[0].textContent = example[0];
      number[1].textContent = example[1];
      number[2].textContent = '?';
      document.querySelector('.example__operation').textContent = '-';
      generateAnswers(Number(example[0]) - Number(example[1]));
    }
  }
}

start();
