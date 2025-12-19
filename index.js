// Select Elements
let menu = document.getElementById("menu")
let expense = document.getElementById("expense-name");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let expenseList = document.querySelector(".expense-list");
let total = document.getElementById("total");
let showAllBtn = document.getElementById("show-all");



document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Get all content sections
    const sections = document.querySelectorAll('.content-section');

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            // Add active class to clicked link
            this.classList.add('active');

            // Show the corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active-section');
            }
        });
    });

    // Show first section by default
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        activeLink.click();
    }
});

// Global Array for storage(load saved data)
let savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

let totalAmount = 0;

// Dropdown toggle
function toggleMenu() {
    menu.classList.toggle("show");
    showAllBtn.style.display = "none"
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


// Create expense card(used for localstorage and new inputs)
function createExpenseCard(data) {
    let expenseCard = document.createElement("div");
    expenseCard.classList.add("expense-card");

    //Store values for filtering
    expenseCard.expenseNameStore = data.name;
    expenseCard.amountValueStore = data.amount;
    expenseCard.categoryStore = data.category;
    expenseCard.dateStore = data.date;

    // Create expense texts(Expense card components)
    let nameDiv = document.createElement("div");
    nameDiv.classList.add("expense-text");
    nameDiv.textContent = data.name;

    let amountDiv = document.createElement("div");
    amountDiv.classList.add("expense-text");
    amountDiv.textContent = "Ksh " + data.amount;

    let categoryDiv = document.createElement("div");
    categoryDiv.classList.add("expense-text");
    categoryDiv.textContent = data.category;

    let dateDiv = document.createElement("div");
    dateDiv.classList.add("expense-text");
    dateDiv.textContent = new Date(data.date).toLocaleDateString();


    // Create expense delete button
    let expenseBtn = document.createElement("button");
    expenseBtn.classList.add("delete-btn");
    expenseBtn.textContent = "DELETE";

    // Append children to card
    expenseCard.appendChild(nameDiv);
    expenseCard.appendChild(amountDiv);
    expenseCard.appendChild(categoryDiv);
    expenseCard.appendChild(dateDiv);
    expenseCard.appendChild(expenseBtn);

    // Append card to expense list
    expenseList.appendChild(expenseCard);

    //Delete button logic
    expenseBtn.onclick = function () {
        expenseList.removeChild(expenseCard);

        // remove from localStorage list
        savedExpenses = savedExpenses.filter(item =>
            !(item.name === data.name &&
                item.amount === data.amount &&
                item.date === data.date
            )
        )
        localStorage.setItem("expenses", JSON.stringify(savedExpenses));
        recalculateVisibleTotal();
    }

    return expenseCard;
}

// Functionality for recalculating totals once a card is deleted
function recalculateVisibleTotal() {
    let allCards = document.querySelectorAll(".expense-card");
    let newTotal = 0;

    allCards.forEach(card => {
        if (card.style.display !== "none") {
            newTotal = newTotal + card.amountValueStore;
        }
    })
    total.textContent = "TOTAL : KSH " + newTotal.toLocaleString();
}

// Adding expense cards
function addExpense() {
    // Get the values of the input fields
    let expenseInput = expense.value.trim();// .trim() helps eliminate invalid inputs like spaces
    let amountInput = amount.value.trim();
    let categorySelect = category.value;

    if (!expenseInput || !amountInput || !categorySelect) {
        showPopUp("Please fill in all the fields!");
        return;// return in the case is used to stop the rest of the code from running if the above if statement evaluates to true which would mean the is not input in at least one input field
    }

    let numberInput = Number(amountInput);//.value gives a string but we want an actual number that's why we put Number()

    if (isNaN(numberInput) || numberInput <= 0) {
        showPopUp("Please enter a valid amount!");
        return;
    }

    // Create an expense object
    let expenseData = {
        name: expenseInput,
        amount: numberInput,
        category: categorySelect,
        date: new Date().toISOString().split("T")[0]
    };

    // Save to storage
    savedExpenses.push(expenseData);
    localStorage.setItem("expenses", JSON.stringify(savedExpenses));

    // Create a card
    createExpenseCard(expenseData);

    // Update totals(Additonal expenses)
    totalAmount = totalAmount + numberInput;
    total.textContent = "TOTAL : KSH " + totalAmount.toLocaleString();// .toLocaleString() is used when adding commas to monetary figures for example instead of 12345678, we can have 12,345,678

    //  Clear inputs
    expense.value = '';
    amount.value = '';
    category.value = '';
}


// Filtering by category
let allCategoryButtons = document.querySelectorAll(".menu");// Grab the category buttons


// Functionality for when any of the category buttons are clicked, only the cards with that category is displayed and the total amounts updated based on the currently displayed cards
function filterByCategory(selectedCategory) {
    let allCards = document.querySelectorAll(".expense-card");
    let filteredTotal = 0;
    //Loop through the cards
    allCards.forEach((card) => {
        if (card.categoryStore.toLowerCase() === selectedCategory.trim().toLowerCase()) {
            card.style.display = "flex";
            filteredTotal = filteredTotal + card.amountValueStore;
        } else {
            card.style.display = "none";
        }

    });

    total.textContent = "TOTAL : KSH " + filteredTotal.toLocaleString();
    //Display show all button once the filtering has taken place to enable user to go back to the full view of cards and their totals
    showAllBtn.style.display = "block";
};

// Daily filter
function dailyFilter() {
    let allCards = document.querySelectorAll(".expense-card");
    let today = new Date().toISOString().split("T")[0];
    let filteredTotal = 0;

    allCards.forEach(card => {
        if (card.dateStore === today) {
            card.style.display = "flex";
            filteredTotal = filteredTotal + card.amountValueStore;
        } else {
            card.style.display = "none";
        }
    })
    total.textContent = "TOTAL : KSH " + filteredTotal.toLocaleString();
    showAllBtn.style.display = "block";
    showAllBtn.style.marginTop = "15px"
}

// Weekly filter
function weeklyFilter() {
    let allCards = document.querySelectorAll(".expense-card");
    let today = new Date();
    let filteredTotal = 0;

    allCards.forEach(card => {
        let cardDate = new Date(card.dateStore);
        let diffDays = (today - cardDate) / (1000 * 60 * 60 * 24);

        if (isNaN(cardDate)) {
            card.style.display = "none";
            return;
        }

        if (diffDays >= 0 && diffDays <= 7) {
            card.style.display = "flex";
            filteredTotal = filteredTotal + card.amountValueStore;
        } else {
            card.style.display = "none";
        }
    });
    total.textContent = "TOTAL : KSH " + filteredTotal.toLocaleString();
    showAllBtn.style.display = "block";
    showAllBtn.style.marginTop = "15px"
}

// Monthly filter
function monthlyFilter() {
    let allCards = document.querySelectorAll(".expense-card");
    let today = new Date();
    let filteredTotal = 0;

    allCards.forEach(card => {
        let cardDate = new Date(card.dateStore);

        if (
            !isNaN(cardDate) &&
            cardDate.getFullYear() === today.getFullYear() &&
            cardDate.getMonth() === today.getMonth()
        ) {
            card.style.display = "flex";
            filteredTotal = filteredTotal + card.amountValueStore;
        } else {
            card.style.display = "none";
        }
    })
    total.textContent = "TOTAL : KSH " + filteredTotal.toLocaleString();
    showAllBtn.style.display = "block";
    showAllBtn.style.marginTop = "15px"
}

//Logic to show all cards and reset totals when showall button is clicked

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

// function to load all cards when the page is opened

function loadSavedExpenses() {
    savedExpenses.forEach(data => {
        createExpenseCard(data);
    });

    // calculate total on load
    let totalAll = 0;
    savedExpenses.forEach(item => totalAll = totalAll + item.amount);
    totalAmount = totalAll;
    total.textContent = "TOTAL : KSH " + totalAll.toLocaleString();
}

loadSavedExpenses();

