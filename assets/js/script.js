/*jshint esversion: 6 */
//Create Refrence Variables
let totalAmount = document.getElementById("total-amount");
let expenseAmount = document.getElementById("expense-amount");
let totalAmountButton = document.getElementById("total-amount-button");
let checkAmountButton = document.getElementById("check-amount");
let errorMessage = document.getElementById("budget-error");
let expenseError = document.getElementById("expense-error");
let expenseDate = document.getElementById("expense-date");
let expenseTitle = document.getElementById("expense-title");
let amount = document.getElementById("amount");
let balanceValue = document.getElementById("balance-amount");
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



//Function To Disable Edit and Delete Button
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
      element.disabled = bool;
    });
  };

//function to update list elements

let modifyElement = (element,edit = false) => {

    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerText;
    let currentExpense = expenditureValue.innerText;
    let parentDate = parentDiv.querySelector(".date").innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
        let parentText = parentDiv.querySelector(".expense").innerText;
        expenseDate.value = parentDate;
        expenseTitle.value = parentText;
        expenseAmount.value = parentAmount;
        disableButtons(true);
  }
  
  balanceValue.innerText = parseInt(currentBalance) + parseInt(parentAmount);
  expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);
  parentDiv.remove();
};


//function to create list
    let listCreator =  (expenseDateValue,expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="date">${expenseDateValue}</p><p class="expense">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    //edit button
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit");
    editButton.style.fontSize = "25px";
    editButton.addEventListener("click", () => {
      modifyElement(editButton, true);
    });
    //delete button
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash-can", "delete");
    deleteButton.style.fontSize = "25px";
    deleteButton.addEventListener("click", () => {
      modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
};

//set Expense section

checkAmountButton.addEventListener("click", () => {
    //empty check
    if (!expenseDate.value || !expenseAmount.value || !expenseTitle.value) {
       
       expenseError.classList.remove("hide");
       return false; 
    }
    else {

      expenseError.classList.add("hide");
    }
//enable button   
disableButtons(false);

//add expense
let expenditure = parseInt(expenseAmount.value);
//total expense (execting + new)
let sum = parseInt(expenditureValue.innerText) + expenditure;
expenditureValue.innerText = sum;
//calculate balance (budget - totalexpense)
let totalBalance = tempAmount - sum ;
balanceValue.innerText = totalBalance;
//Create list
listCreator(expenseDate.value, expenseTitle.value, expenseAmount.value);
//Empty inputs
expenseDate.value= "";
expenseTitle.value = "";
expenseAmount.value = "";
});