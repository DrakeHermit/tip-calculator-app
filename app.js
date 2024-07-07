const tipSelectionBtns = document.querySelectorAll(
  ".tip__grid input[name=tip-selection]"
);
const customBtnInput = document.getElementById("custom-input");
const resetBtn = document.getElementById("reset-button");
const billPrice = document.getElementById("bill-price");
const numberOfPeople = document.getElementById("number-of-people");
const formData = document.getElementById("form");

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

const submitForm = (e) => {
  e.preventDefault();

  const formDataValues = new FormData(formData);

  const formDataEntries = {};

  formDataValues.forEach((value, key) => {
    formDataEntries[key] = +value;
  });

  console.log(formDataEntries);
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
