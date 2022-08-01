const btns = document.querySelectorAll('.counter-btn');
const counts = document.querySelectorAll('.count');
const allBars = document.querySelectorAll('.progress-bar');
const countersContainer = document.getElementById('counters-container');

// increament value for each counter
const INCREAMENT = {
  counter1: 75,
  counter2: 40,
  counter3: 20,
  counter4: 17,
  counter5: 5,
};
const BG_COLORS = {
  85: '#2ecc71',
  65: '#f39c12',
  50: '#d35400',
  25: '#c0392b',
};

btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    countersContainer.requestFullscreen();
    /* -----------------------------------------------------------------------
    get parent element for the event target(btn)
    to select elements in the same counter-group (counter 1 , counter 2 ...etc)
    -------------------------------------------------------------------------- */
    const counterGroup = btn.parentElement; // HTML element
    const counter = counterGroup.getElementsByTagName('span')[0]; // HTML element

    // increase numeric value
    let count = parseInt(counter.innerText); // number
    const increamentValue = btn.getAttribute('data-for');
    count += INCREAMENT[increamentValue];
    counter.innerText = count;

    let total = 0;
    counts.forEach((value) => {
      total += +value.innerText;
    });

    // change all progress bars values
    allBars.forEach((bar) => {
      const column = bar.parentElement.parentElement; // HTML element
      const span = column.parentElement.getElementsByTagName('span')[0]; // HTML element
      let percentage = calcPercentage(+span.innerText, total); // :number
      bar.setAttribute('aria-valuenow', percentage);
      bar.style.width = `${percentage}%`;
      bar.innerText = `${percentage}%`;
      bar.style.backgroundColor = BG_COLORS[chooseColor(percentage)];
    });
  });
});

// helper functions

function calcPercentage(value, total) /* :number */ {
  return Math.round((value / total) * 100);
}

function chooseColor(number) {
  if (number >= 85) return '85';
  if (number >= 65) return '65';
  if (number >= 50) return '50';
  return '25';
}
