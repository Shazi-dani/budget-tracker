//Create Refrence Variables
let totalAmount = document.getElementById("total-amount");
let expenseAmount = document.getElementById("expense-amount");
let totalAmountButton = document.getElementById("total-amount-button");
let checkAmountButton = document.getElementById("check-amount");
let errorMessage = document.getElementById("budget-error");
let expenseError = document.getElementById("expense-error");
let budgetDate = document.getElementById("budget-date");
let expenseDate = document.getElementById("expense-date");
let expenseTitle = document.getElementById("expense-title");
let amount = document.getElementById("amount");
let expenditureValue = document.getElementById("expenditure-value");
let list = document.getElementById("list");
let tempAmount = 0;

//set budget part
totalAmountButton.addEventListener("click", () => {

    tempAmount = totalAmount.value;
//error message for budget section

if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove ("hide");
}
else {
    errorMessage.classList.add ("hide");

//set budget
amount.innerHTML = tempAmount;

//set balance
balanceValue.innerText = tempAmount - expenditureValue.innerText;

//clear input box
totalAmount.value = "";
}

});