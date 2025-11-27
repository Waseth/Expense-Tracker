# Expense Tracker App

A simple and clean expense-tracking web app built entirely with HTML, CSS, and JavaScript. I created it as a solo project to sharpen my frontend skills and to help me manage my upkeep expenses, especially after realizing I tend to overspend.

---

## About the Project

This project started as a small idea but quickly turned into a full learning journey. While building it, I explored how to structure a real mini‑application handling data, filtering, dynamic UI updates, local storage, calculations, and clean user interactions.

The goal of the app is simple:

> **Help users track their money usage, visualize spending, and stay organized.**

---

## What I Learned

Working on this project taught me a lot. Some of the key lessons include:

### **1. DOM Manipulation in Depth**

* Creating elements dynamically using JavaScript
* Updating the UI based on user interactions
* Efficiently handling click events and UI state

### **2. Local Storage (Saving and Loading Data)**

* How to store an array of objects in localStorage
* How to retrieve, parse, and render stored data
* Making the app persist even after refresh

### **3. Filtering Logic**

I learned to build multiple filtering systems:

* **Category filtering**
* **Daily filtering (using ISO date)**
* **Weekly filtering (using date differences)**
* **Monthly filtering (using getMonth() & getFullYear())**

### **4. Clean Total Recalculation Logic**

Instead of tracking a single total manually, I learned to:

* Recalculate totals based on only visible cards
* Handle total changes when deleting cards
* Prevent incorrect totals after filtering

### **5. Form Validation**

* Handling wrong numeric inputs
* Preventing empty fields
* Limiting the expense name length
* Displaying custom pop‑up warnings

### **6. Better Project Structure & Readability**

* Separating functions by purpose
* Storing reusable logic
* Avoiding duplicated code where possible

### **7. Working With Dates in JavaScript**

* Using `toISOString()` for consistent date formatting
* Converting stored dates into JavaScript Date objects
* Calculating differences between dates in days

---

## How the App Works (Flow)

Here’s the full flow from start to finish:

### **1. User Inputs Data**

The user types:

* Expense name
* Amount
* Category

and clicks **Add**.

### **2. Validation**

The app checks:

* All fields filled
* Amount is a valid number
* Expense name not exceeding the character limit

If something is wrong → A pop‑up message appears.

### **3. Expense Card Is Created**

A new card is generated with:

* Name
* Amount
* Category
* Date

This card appears in the list.

### **4. Data Is Stored in Local Storage**

Each new expense is saved permanently.
When the app is refreshed → All stored expenses are automatically loaded.

### **5. Filtering Options**

Users can filter expenses by:

* **Category**
* **Today’s expenses**
* **This week’s expenses**
* **This month’s expenses**

Filtering updates:

* What cards are shown
* The total amount shown

### **6. Deleting Cards**

When the delete button is clicked:

* The card is removed from the DOM
* The data is removed from localStorage
* Total recalculates only based on visible cards

### **7. Show All Button**

After filtering, the user can:

* Click **Show All** to view everything again
* Total recalculates correctly

---

## Technologies Used

This entire project was built without any frameworks.

### **Frontend:**

* **HTML5** – structure of the app
* **CSS3** – styling, layout, responsiveness
* **JavaScript (ES6+)** – full logic, filtering, storage, DOM work

---

## Final Notes

This project really strengthened my problem‑solving skills and taught me how to think like a developer building a functional product. It pushed me to understand JavaScript much more deeply.

I’m proud of how it turned out, and I’m excited to keep on growing as a developer!
