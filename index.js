let menu = document.getElementById("menu")
let expense = document.getElementById("expense-name");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let expenseList = document.querySelector(".expense-list");
let total = document.getElementById("total");
let totalAmount = 0;

function toggleMenu(){
    menu.classList.toggle("show");
}

function addExpense(){
    // get the values of the input fields
    let expenseInput = expense.value.trim();
    let amountInput = amount.value.trim();
    let categorySelect = category.value;
    let currentInput = Number(amountInput);

    // check if input is valid
    if(!expenseInput || !amountInput || !categorySelect){
        showPopUp("Please fill in all the fields!");
        return;
    }
    // check if only a number is the input
     if (isNaN(currentInput) || currentInput <= 0) {
        showPopUp("Please enter a valid amount!");
        return;
    }

    // create expense card
    let expenseCard = document.createElement("div");
    expenseCard.classList.add("expense-card");

    // create expense texts
    let expenseName = document.createElement("div");
    expenseName.classList.add("expense-text");
    expenseName.textContent = expenseInput;

    let expenseAmount = document.createElement("div");
    expenseAmount.classList.add("expense-text");
    expenseAmount.textContent = "Ksh " + amountInput;

    let expenseCategory = document.createElement("div");
    expenseCategory.classList.add("expense-text");
    expenseCategory.textContent = categorySelect;

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("expense-text");
    dateDiv.textContent = new Date().toLocaleDateString();

    // store card details for filtering later
    expenseCard.expenseNameStore = expenseInput;
    expenseCard.categoryStore = categorySelect;

    // create expense button
    let expenseBtn = document.createElement("button");
    expenseBtn.classList.add("delete-btn");
    expenseBtn.textContent = "DELETE";
    expenseCard.appendChild(expenseBtn);

    // update totals

    expenseCard.amountValue = currentInput;
    totalAmount += currentInput;
    total.textContent = "TOTAL : KSH " + totalAmount.toLocaleString();

    expenseBtn.onclick = function(){
        totalAmount -= expenseCard.amountValue;
        total.textContent = "TOTAL : KSH " + totalAmount.toLocaleString();
        expenseList.removeChild(expenseCard);
    }



    // append children to card
    expenseCard.appendChild(expenseName);
    expenseCard.appendChild(expenseAmount);
    expenseCard.appendChild(expenseCategory);
    expenseCard.appendChild(dateDiv);
    expenseCard.appendChild(expenseBtn);

    // append card to expense list
    expenseList.appendChild(expenseCard);



    // clear inputs
    expense.value = '';
    amount.value = '';
    category.value = '';

}

function showPopUp(message){
    let popUp = document.getElementById("popup");
    popUp.textContent = message;
    popUp.classList.add("show");

    setTimeout(()=>{
        popUp.classList.remove("show");
    },3000)
}