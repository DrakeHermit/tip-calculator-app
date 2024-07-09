const tipSelectionBtns = document.querySelectorAll(
  ".tip__grid input[name=tip-selection]"
);
const customBtnInput = document.getElementById("custom-input");
const resetBtn = document.getElementById("reset-button");
const billPrice = document.getElementById("bill-price");
const numberOfPeople = document.getElementById("number-of-people");
const formData = document.getElementById("form");
const tipAmountPerPersonEl = document.getElementById("tip-amount-per-person");
const totalPerPersonEl = document.getElementById("total-amount");
const numberOfPeopleGroup = document.querySelector(".number-of-people-group");

let errorMessage;

// Logic to enable/disable the reset button
billPrice.addEventListener("input", (e) => {
  const value = e.target.value;
  if (value.trim() !== "") {
    resetBtn.disabled = false;
    resetBtn.innerText = "Submit";
  } else {
    resetBtn.disabled = true;
  }
});

const calculateTip = (bill, tipPercentage, numberOfPeople) => {
  let tipInPercentage = tipPercentage / 100;
  let tipAmountPerPerson =
    Math.floor((tipInPercentage / numberOfPeople) * bill * 100) / 100;
  let totalPerPerson = bill / numberOfPeople + tipAmountPerPerson;

  return { tipAmountPerPerson, totalPerPerson };
};

const updateDOM = (bill, tipPercentage, peopleCount) => {
  const { tipAmountPerPerson, totalPerPerson } = calculateTip(
    bill,
    tipPercentage,
    peopleCount
  );

  tipAmountPerPersonEl.innerText = `$${tipAmountPerPerson}`;
  totalPerPersonEl.innerText = `$${totalPerPerson}`;
};

const handleErrorState = (bill, tipPercentage, peopleCount) => {
  if (numberOfPeople.value.trim() === "") {
    numberOfPeople.classList.add("error-selection");
    billPrice.classList.add("valid-selection");
    customBtnInput.classList.add("valid-selection");
    createErrorMessage();
  } else {
    updateDOM(bill, tipPercentage, peopleCount);
  }
};

const removeFieldValidation = () => {
  numberOfPeople.classList.remove("error-selection");
  billPrice.classList.remove("valid-selection");
  customBtnInput.classList.remove("valid-selection");

  if (errorMessage) {
    errorMessage.remove();
    errorMessage = null;
  }
};

const createErrorMessage = () => {
  errorMessage = document.createElement("p");
  errorMessage.textContent = "Can't be zero";
  errorMessage.classList.add("error-message");

  numberOfPeopleGroup.appendChild(errorMessage);
};

const submitForm = (e) => {
  e.preventDefault();

  const formDataValues = new FormData(formData);

  const formDataEntries = {};

  formDataValues.forEach((value, key) => {
    formDataEntries[key] = +value;
  });

  // Extract the data from the object
  const bill = formDataEntries["bill-price"];
  const tipPercentage = formDataEntries["tip-selection"];
  const peopleCount = formDataEntries["number-of-people"];

  handleErrorState(bill, tipPercentage, peopleCount);
};

resetBtn.addEventListener("click", submitForm);
numberOfPeople.addEventListener("input", removeFieldValidation);

tipSelectionBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    tipSelectionBtns.forEach((click) =>
      click.classList.remove("button-selected")
    );

    const buttonValue = e.target.value;
    const valueWithoutSymbol = buttonValue.replace("%", "");

    customBtnInput.value = valueWithoutSymbol;

    btn.classList.add("button-selected");
  })
);
