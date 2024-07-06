const tipSelectionBtns = document.querySelectorAll(
  ".tip__grid input[name=tip-selection]"
);

tipSelectionBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    tipSelectionBtns.forEach((click) =>
      click.classList.remove("button-selected")
    );

    btn.classList.add("button-selected");
  })
);
