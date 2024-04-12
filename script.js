const Inputele = document.querySelectorAll(".form-control");
const FormEle = document.getElementById("incomeForm");
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
const mBody = document.getElementById("modalBody");

// writ function to add class to ele is-invalid when data is not number
Inputele.forEach(function (ele) {
  ele.addEventListener("input", function () {
    if (isNaN(ele.value)) {
      ele.classList.add("is-invalid");
    } else {
      ele.classList.remove("is-invalid");
    }
  });
});

// write function to get form data
FormEle.addEventListener("submit", function (e) {
  e.preventDefault();
  //check InputEle contain class is-invalid or not
  let isInvalid = false;
  Inputele.forEach(function (ele) {
    if (ele.classList.contains("is-invalid")) {
      isInvalid = true;
    } else if (!ele.value) {
      ele.classList.add("is-invalid");
      isInvalid = true;
    }
  });
  if (isInvalid) {
    alert("Please enter all fields and valid data");
    return;
  }

  calculateResult();
});

// to calculate result
function calculateResult() {
  //get form data
  const data = new FormData(FormEle);
  console.log(data.get("GAI"));
  console.log(data.get("EI"));
  console.log(data.get("AGE"));
  console.log(data.get("TAD"));

  const age = Number(data.get("AGE"));
  const extraIncome = Number(data.get("EI"));
  const totalApplicablededuction = Number(data.get("TAD"));
  const grossAnnualIncome = Number(data.get("GAI"));
  let Income = grossAnnualIncome - totalApplicablededuction + extraIncome;
  console.log(Income);

  let overAllIncome = Income;

  if (Income > 800000) {
    let val = Income - 800000;
    let Tax = 0;
    switch (age) {
      case 1:
        Tax = val * 0.3;
        break;
      case 2:
        Tax = val * 0.4;
        break;
      default:
        Tax = val * 0.1;
    }
    overAllIncome = Income - Tax;
  }
  mBody.innerHTML = "";
  const divELe = document.createElement("div");
  divELe.innerHTML = `<h1>Your Income Will Be</h1>
                     <h4>${overAllIncome}</h4>
                     <p>after tax deductions</p>`;
  mBody.appendChild(divELe);
  // Show the modal
  $("#resultModal").modal("show");
}
