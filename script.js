const calculateForm = document.querySelector('.calculator__form');
const formGroups = document.querySelectorAll('.calculator__form-group');
const feedbackMessages = document.querySelectorAll('.calculator__feedback');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const dayResult = document.querySelector('.results__days-value');
const monthResult = document.querySelector('.results__months-value');
const yearResult = document.querySelector('.results__years-value');
const dayFeedback = document.querySelector('.calculator__day-feedback');
const monthFeedback = document.querySelector('.calculator__month-feedback');
const yearFeedback = document.querySelector('.calculator__year-feedback');

const calculateAge = () => {
  const dateInput = `${yearInput.value}-${monthInput.value}-${dayInput.value}`;
  const timeDifference = new Date() - new Date(dateInput);
  const timeDifferenceSeconds = timeDifference / 1000;

  const calcDay = 60 * 60 * 24;
  const calcMonth = 60 * 60 * 24 * (365.25 / 12);
  const calcYear = 60 * 60 * 24 * 365.25;

  const years = Math.floor(timeDifferenceSeconds / calcYear);
  const months = Math.floor((timeDifferenceSeconds % calcYear) / calcMonth);
  const days = Math.floor((timeDifferenceSeconds % calcMonth) / calcDay);

  animateResult(years, yearResult);
  animateResult(months, monthResult);
  animateResult(days, dayResult);
};

const animateResult = (amount, updateItem) => {
  const animationDuration = 500;
  const intervalMs = 50;
  const increment = Math.ceil(amount / (animationDuration / intervalMs));

  let displayNumber = 0;
  const interval = setInterval(() => {
    if (displayNumber >= amount) {
      clearInterval(interval);
      updateItem.textContent = amount;
      return;
    }
    updateItem.textContent = displayNumber;
    displayNumber += increment;
  }, intervalMs);
};

const validInputs = () => {
  const year = yearInput.value;
  const month = monthInput.value;
  const day = dayInput.value;
  const conditions = [
    {
      isValid: new Date(year, month - 1, day).getDate() == day,
      feedback: dayFeedback,
      message: 'Must be a valid date',
    },
    {
      isValid: day >= 1 && day <= 31,
      feedback: dayFeedback,
      message: 'Must be a valid day',
    },
    {
      isValid: month >= 1 && month <= 12,
      feedback: monthFeedback,
      message: 'Must be a valid month',
    },
    {
      isValid: year <= new Date().getFullYear(),
      feedback: yearFeedback,
      message: 'Must be in the past',
    },
    {
      isValid: !!day,
      feedback: dayFeedback,
      message: 'This field is required',
    },
    {
      isValid: !!month,
      feedback: monthFeedback,
      message: 'This field is required',
    },
    {
      isValid: !!year,
      feedback: yearFeedback,
      message: 'This field is required',
    },
  ];

  let invalidInputs = [];
  conditions.forEach(({ isValid, feedback, message }) => {
    if (isValid) return;

    feedback
      .closest('.calculator__form-group')
      .classList.add('calculator__input-error');

    feedback.textContent = message;
    invalidInputs.push(false);
  });
  return invalidInputs.length === 0;
};

const clearValidatiionFeedback = () => {
  formGroups.forEach((g) => g.classList.remove('calculator__input-error'));
  feedbackMessages.forEach((m) => (m.textContent = ''));
};

calculateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  clearValidatiionFeedback();
  if (!validInputs()) return;
  calculateAge();
});
