let stat = localStorage.getItem('stats');
let statsList = document.querySelector('.stats__list');
if (stat === null) {
  localStorage.setItem('stats', "{stats: []}");
} else {
  let stats = JSON.parse(stat);

  for (let i = stats.stats.length - 1; i >= 0; i--) {
    let buf = stats.stats[i];
    console.log(buf)
    let correctly = [];
    let len = 0;
    for (let j = 0; j < buf.result.length; j++) {
      if (buf.result[j] === true) {
        correctly.push('stats__circle-correct');
        len++;
      } else {
        correctly.push('stats__circle-wrong');
      }
    }
    if (i === stats.stats.length - 1 && len === 10) {
      document.querySelector('.start__title').textContent = "молодец!"
    } else if (i === stats.stats.length - 1 && len === 9) {
      document.querySelector('.start__title').textContent = "почти"
    } else if (i === stats.stats.length - 1 && len === 8) {
      document.querySelector('.start__title').textContent = "постарайся"
    } else if (i === stats.stats.length - 1 && len === 7) {
      document.querySelector('.start__title').textContent = "поднажми"
    } else if (i === stats.stats.length - 1 && len <= 6) {
      document.querySelector('.start__title').textContent = "я в тебя верю"
    }
    statsList.insertAdjacentHTML("beforeend", `<div class="stats__item">
            <div class="stats__points">
              <div class="stats__circle ${correctly[0]}"></div>
              <div class="stats__cirscle ${correctly[1]}"></div>
              <div class="stats__circle ${correctly[2]}"></div>
              <div class="stats__circle ${correctly[3]}"></div>
              <div class="stats__circle ${correctly[4]}"></div>
              <div class="stats__circle ${correctly[5]}"></div>
              <div class="stats__circle ${correctly[6]}"></div>
              <div class="stats__circle ${correctly[7]}"></div>
              <div class="stats__circle ${correctly[8]}"></div>
              <div class="stats__circle ${correctly[9]}"></div>
              <div class="stats__info">${len}/10</div>
            </div>
            <div class="stats__date">${buf.date}</div>
          </div>`)
  }
}