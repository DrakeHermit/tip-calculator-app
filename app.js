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

  calculateTip(bill, tipPercentage, peopleCount);
  const { tipAmountPerPerson, totalPerPerson } = calculateTip(
    bill,
    tipPercentage,
    peopleCount
  );

  tipAmountPerPersonEl.innerText = `$${tipAmountPerPerson}`;
  totalPerPersonEl.innerText = `$${totalPerPerson}`;
};

resetBtn.addEventListener("click", submitForm);

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
