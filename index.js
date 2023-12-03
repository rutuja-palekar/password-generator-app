const rangeSlider = document.getElementById("rangeSlider");
const showRangeValue = document.getElementById("showRangeValue");
const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*-+=/|<>?';
const copyIcon = document.getElementById('copyIcon');


const generatePassword = (charLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {

  const characterSet = [];

  const checkboxes = document.querySelectorAll('.optionsContainer input[type="checkbox"]');
  const checkboxValues = [includeUppercase, includeLowercase, includeNumbers, includeSymbols];
  const characterSets = [uppercaseLetters, lowercaseLetters, numbers, symbols];

  checkboxes.forEach((checkbox, index) => {
    if (checkboxValues[index]) {
      characterSet.push(characterSets[index]);
    }
  });

  let password = '';

  for (let i = 0; i < charLength; i++) {
    const randomSetIndex = Math.floor(Math.random() * characterSet.length);
    const selectedSet = characterSet[randomSetIndex];

    const randomCharIndex = Math.floor(Math.random() * selectedSet.length);
    const selectedChar = selectedSet[randomCharIndex];

    password += selectedChar;
  }

  return password;
}


const copyToClipboard = () => {
  const viewPassword = document.getElementById('viewPassword');
  const password = viewPassword.textContent;

  if ('clipboard' in navigator) {
    navigator.clipboard.writeText(password)

      .then(() => {
        alert('Password copied to clipboard');
      })

      .catch(err => {
        console.error('Unable to copy text: ', err);
      });
  }

  else {
    console.error('Clipboard API not available in this browser.');
  }
}


const showStrength = (charLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols) => {

  const strengthTextElement = document.querySelector('.strengthRating');

  const checkedCases = (includeUppercase ? 1 : 0) + (includeLowercase ? 1 : 0) + (includeNumbers ? 1 : 0) + (includeSymbols ? 1 : 0);

  if (checkedCases === 0 || charLength < 5) {
    strengthTextElement.textContent = "Very Weak";
    strengthTextElement.style.color = "#FC0101";
  }

  else if (checkedCases === 1 || (checkedCases === 2 && charLength < 8)) {
    strengthTextElement.textContent = "Weak";
    strengthTextElement.style.color = "#FC0101";
  }

  else if ((checkedCases === 2 && charLength >= 8) || (checkedCases === 3 && charLength < 10)) {
    strengthTextElement.textContent = "Medium";
    strengthTextElement.style.color = "#E7D909";
  }

  else if ((checkedCases === 3 && charLength >= 10) || (checkedCases === 4 && charLength < 12)) {
    strengthTextElement.textContent = "Strong";
    strengthTextElement.style.color = "#03C988";
  }

  else if (checkedCases === 4 && charLength >= 12) {
    strengthTextElement.textContent = "Very Strong";
    strengthTextElement.style.color = "#03C988";
  }

  else {
    strengthTextElement.textContent = "Invalid";
  }
}


const showPassword = () => {

  const charLength = document.getElementById('rangeSlider').value;

  const includeUppercase = document.querySelectorAll('.optionsContainer input[type="checkbox"]')[0].checked;
  const includeLowercase = document.querySelectorAll('.optionsContainer input[type="checkbox"]')[1].checked;
  const includeNumbers = document.querySelectorAll('.optionsContainer input[type="checkbox"]')[2].checked;
  const includeSymbols = document.querySelectorAll('.optionsContainer input[type="checkbox"]')[3].checked;

  const password = generatePassword(charLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);

  const showPasswordElement = document.querySelector('.showPassword');
  showPasswordElement.textContent = password;

  showStrength(charLength, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
}

showPassword();

rangeSlider.addEventListener("input", () => {
  showRangeValue.textContent = rangeSlider.value;
})

copyIcon.addEventListener('click', copyToClipboard)