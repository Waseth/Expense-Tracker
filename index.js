// Select Elements
let menu = document.getElementById("menu")
let expense = document.getElementById("expense-name");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let expenseList = document.querySelector(".expense-list");
let total = document.getElementById("total");
let showAllBtn = document.getElementById("show-all");

let totalAmount = 0;

// Dropdown toggler
function toggleMenu() {
    menu.classList.toggle("show");
    showAllBtn.style.display = "none"
}




function addExpense() {
    // Get the values of the input fields
    let expenseInput = expense.value.trim();// .trim() helps eliminate invalid inputs like spaces
    let amountInput = amount.value.trim();
    let categorySelect = category.value;


    let numberInput = Number(amountInput);//.value gives a string but we want an actual number that's why we put Number()

    if (expense.value.length > 9) {
        showPopUp("Expense name should not exceed 9 characters!");
        return;
    }
    // Check if input is valid
    if (!expenseInput || !amountInput || !categorySelect) {
        showPopUp("Please fill in all the fields!");
        return;// return in the case is used to stop the rest of the code from running if the above if statement evaluates to true which would mean the is not input in at least one input field
    }
    // Check if only a number is the input
    if (isNaN(numberInput) || numberInput <= 0) {
        showPopUp("Please enter a valid amount!");
        return;
    }

    // Create expense card
    let expenseCard = document.createElement("div");
    expenseCard.classList.add("expense-card");

    // Create expense texts(Expense card components)
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

    // Store card input values onto the card element permanently for filtering and updates.
    expenseCard.expenseNameStore = expenseInput;
    expenseCard.categoryStore = categorySelect;
    expenseCard.amountValueStore = numberInput;

    // Create expense button
    let expenseBtn = document.createElement("button");
    expenseBtn.classList.add("delete-btn");
    expenseBtn.textContent = "DELETE";

    // Append children to card
    expenseCard.appendChild(expenseName);
    expenseCard.appendChild(expenseAmount);
    expenseCard.appendChild(expenseCategory);
    expenseCard.appendChild(dateDiv);
    expenseCard.appendChild(expenseBtn);

    // Append card to expense list
    expenseList.appendChild(expenseCard);


    //  Clear inputs
    expense.value = '';
    amount.value = '';
    category.value = '';

    // Update totals(Additonal expenses)
    totalAmount = totalAmount + expenseCard.amountValueStore;
    total.textContent = "TOTAL : KSH " + totalAmount.toLocaleString();// .toLocaleString() is used when adding commas to monetary figures for example instead of 12345678, we can have 12,345,678

    // Functionality for 'DELETE' button
    expenseBtn.onclick = function () {
        totalAmount = totalAmount - expenseCard.amountValueStore;
        total.textContent = "TOTAL : KSH " + totalAmount.toLocaleString();
        expenseList.removeChild(expenseCard);
    }


}

// functionality for showing pop up message if the input fields are not all filled up
function showPopUp(message) {
    let popUp = document.getElementById("popup");
    popUp.textContent = message;
    popUp.classList.add("show");

    setTimeout(() => {
        popUp.classList.remove("show");
    }, 3000)
};

// Filtering by category
let allCategoryButtons = document.querySelectorAll(".menu");// Grab the category buttons


// Functionality for when any of the category buttons are clicked, only the cards with that category is displayed and the total amounts updated based on the currently displayed cards
function filterByCategory(selectedCategory) {
    let allCards = document.querySelectorAll(".expense-card");
    let filteredTotal = 0;
    //Loop through the cards
    allCards.forEach((card) => {
        if (card.categoryStore.toLowerCase() === selectedCategory.toLowerCase()) {
            card.style.display = "flex";
            filteredTotal = filteredTotal + card.amountValueStore;
        } else {
            card.style.display = "none";
        }
        total.textContent = "TOTAL : KSH " + filteredTotal.toLocaleString();
    });

    //Display show all button once the filtering has taken place to enable user to go back to the full view of cards and their totals
    showAllBtn.style.display = "block";
};

//Logid to show all cards and reset totals when showall button is clicked

showAllBtn.addEventListener("click", () => {
    let allCards = document.querySelectorAll(".expense-card");
    let totalAll = 0;

    allCards.forEach((card) => {
        card.style.display = "flex";
        totalAll = totalAll + card.amountValueStore;
    });

    total.textContent = "TOTAL : KSH " + totalAll.toLocaleString();

    showAllBtn.style.display = "none"
})

//Loop through the buttons
allCategoryButtons.forEach((clickedBtn) => {
    clickedBtn.addEventListener("click", () => {
        filterByCategory(clickedBtn.textContent);
    });
});


